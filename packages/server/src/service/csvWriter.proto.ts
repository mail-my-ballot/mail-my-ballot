import { createArrayCsvStringifier } from 'csv-writer'
const header = ['name', 'lang'] as const

const writer = createArrayCsvStringifier({
    header: header as unknown as string[]
});

const records = [
    {name: 'Bob',  lang: 'French, English'},
    {name: 'Mary', lang: 'English'}
];

console.log(
  writer.getHeaderString() +
  writer.stringifyRecords(records.map(r => header.map(h => r[h])))
)
