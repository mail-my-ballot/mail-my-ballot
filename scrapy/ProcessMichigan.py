import json

def filter_dict_by_key(d, keys):
  keys = set(keys)
  return { k: v for k, v in d.items() if k in keys}

output = []

with open('Michigan.jl') as fh:
  for line in fh:
    data = json.loads(line)

    if data['type'] != 'local':
      continue
    
    value = filter_dict_by_key(
      data,
      {'clerk', 'email', 'phone', 'fax'}
    )

    value['county'] = data['CountyName']
    value['city'] = data['jurisdictionName']

    # rename Twp to Township
    if value['city'].endswith('Twp'):
      value['city'] = value['city'][:-3] + 'Township'

    output += [value]

with open('Michigan.json', 'w') as fh:
  json.dump(output, fh,
    sort_keys=True, indent=2, separators=(',', ': ')
  )
