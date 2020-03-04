let fetchRun = (url) => {
  fetch(url).then(v => {
    v.text().then(txt => {
      eval(txt)
    })
  })
}

fetchRun('https://medialab.github.io/artoo/public/dist/artoo-latest.min.js')
fetchRun('https://code.jquery.com/jquery-2.1.3.min.js')

setTimeout(() => {
  let name = artoo.scrape('span.bigRed', 'text')[0]
  let title = artoo.scrape('p.title', 'text')[0]
  let [email, url] = artoo.scrape('#rightContent a', 'href')
  let county = window.location.href.split('=')[1]

  artoo.saveJson({
    county,
    name,
    title,
    email,
    url,
  }, {filename: `${county}.json`})

}, 200)
