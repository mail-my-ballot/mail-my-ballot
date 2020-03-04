import json
import glob

files = glob.glob('data/*.json')
data = []
for file in files:
  with open(file) as fh:
    datum = json.load(fh)
    datum['name'] = datum['name'].replace(u'\xa0', ' ')
    data += [datum]

with open('florida.json', 'w') as fh:
  json.dump(data, fh)
