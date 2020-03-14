# -*- coding: utf-8 -*-
import urllib.parse as urlparse
from urllib.parse import parse_qs

import scrapy

def urlparse_qs(url):
  parsed = urlparse.urlparse(url)
  return parse_qs(parsed.query)

def safe_extract(selector):
  results = selector.extract()
  if not results:
    return None
  element = results[0]
  if not element:
    return None
  return element.strip()

def parse_data(response):
  body = response.css('div.card-body')
  phone = safe_extract(body.xpath('*[contains(text(), "Phone")]/following-sibling::text()'))
  fax = safe_extract(body.xpath('*[contains(text(), "Fax")]/following-sibling::text()'))

  emails = response.css('div.card-body a::attr(href)').getall()
  try:
    email = next(e.split('mailto:')[1] for e in emails if e.startswith('mailto:'))
  except StopIteration:
    email = None

  first_line = body.css('::text').getall()[0].strip().split(',')
  if len(first_line) == 2:
    clerk, title = first_line
  elif len(first_line) == 1:
    clerk, title = first_line[0], None
  else:
    clerk, title = first_line, None

  return {
    'clerk': clerk,
    'title': title,
    'phone': phone,
    'fax': fax,
    'email': email,
  }

def filter_dict_by_key(d, keys):
  keys = set(keys)
  return { k: v for k, v in d.items() if k in keys}

class MichiganSpider(scrapy.Spider):
  name = 'Michigan'
  allowed_domains = ['mvic.sos.state.mi.us']
  start_urls = ['https://mvic.sos.state.mi.us/Clerk']

  def parse(self, response):
    options = response.css('select#Counties>option')
    counties = [{
      'CountyID': option.css('::attr(value)').get(),
      'CountyName': option.css('::text').get(),
    } for option in options]

    self.crawler.stats.inc_value('county', len(counties))

    for county in counties:
      yield scrapy.FormRequest(
        url='https://mvic.sos.state.mi.us/Clerk/SearchByCounty',
        formdata=county,
        callback=self.parse_county,
        meta=county,
      )

  def parse_county(self, response):
    links = response.css('a.local-clerk-link')
    locs = [{
      'url': link.css('::attr(href)').get(),
      'name': link.css('::text').get(),
    } for link in links]

    county_data = filter_dict_by_key(response.meta, {'CountyID', 'CountyName'})

    yield {
      'type': 'county',
      **county_data,
      **parse_data(response),
    }

    self.crawler.stats.inc_value(f'local', len(locs))
    self.crawler.stats.inc_value(f'county/{response.meta["CountyName"]}/local', len(locs))

    for loc in locs:
      params = urlparse_qs(loc['url'])
      if 'dummy' in params:
        del params['dummy']
      formdata = {k: v[0] for k,v in params.items()}
      yield scrapy.FormRequest(
        url='https://mvic.sos.state.mi.us/Clerk/LocalClerk',
        formdata=formdata,
        callback=self.parse_local,
        meta={
          'county': county_data,
          **formdata,
        }
      )

  def parse_local(self, response):
    local_data = filter_dict_by_key(response.meta, {'jurisdictionName', 'jurisdictionCode'})
    yield {
      'type': 'local',
      **response.meta['county'],
      **local_data,
      **parse_data(response),
    }
