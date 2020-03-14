import json
import glob

files = glob.glob('data/*.json')
dict_ = {}
for file in files:
  with open(file) as fh:
    datum = json.load(fh)
    county = datum['title'].split('Supervisor')[0].strip()
    dict_[county] = {
      'county': county,
      'clerk': datum['name'].replace(u'\xa0', ' ').split(',')[0].strip(),
      'email': datum['email'].split(':')[1].strip(),  # ignore leading 'mailto:'
      'url': datum['url'],
    }

with open('florida.json', 'w') as fh:
  json.dump(dict_, fh, indent='  ')
