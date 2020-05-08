import { geocode } from './gm'

const main = async() => {
  const address = await geocode('240 W Dickman St, Baltimore, MD 21230')
  console.log(address)
}

main()
