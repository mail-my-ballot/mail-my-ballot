import { geocode } from './gm'

const main = async() => {
  const address = await geocode('132 N Royal St Ste 100Alexandria, VA 22314-3246')
  console.log(address)
}

main()
