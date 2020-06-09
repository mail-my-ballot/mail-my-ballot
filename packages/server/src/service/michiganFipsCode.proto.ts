import { cacheMichiganResponse, toFipscode } from './michiganFipsCode'

const main = async() => {
  const response = await cacheMichiganResponse([-84, +45])
  if (!response) return
  console.log(response)
  const fipscode = await toFipscode(response)
  if (!fipscode) return 
  console.log(fipscode)
}

main()
