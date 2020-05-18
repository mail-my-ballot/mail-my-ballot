import fs from 'fs'

const encoding = 'utf8'

// eslint-disable-next-line @typescript-eslint/no-explicit-any
type Func<T extends Record<string, any>> = (_: string) => Promise<T>

export const cache = <T>(f: Func<T>): Func<T> => {
  return async (arg: string) => {
    const path = `${__dirname}/cache/${arg}.json`
    if (fs.existsSync(path)) {
      const data = fs.readFileSync(path, { encoding } )
      return JSON.parse(data)
    } else {
      const ret = await f(arg)
      const data = JSON.stringify(ret)
      fs.writeFileSync(path, data, { encoding })
      return JSON.parse(data)
    }
  }
}
