import { rawMichiganResponse, toFipscode } from './michiganFipsCode'
import { cache } from './util'

const main = async() => {
  const response = await cache(rawMichiganResponse)([-84, +45])
  if (!response) return 
  console.log(response)
  const fipscode = await toFipscode(response)
  if (!fipscode) return 
  console.log(fipscode)
}

main()
