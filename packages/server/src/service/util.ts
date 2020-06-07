import fs from 'fs'

const encoding = 'utf8'

// eslint-disable-next-line @typescript-eslint/no-explicit-any
type Func<A extends string | number[], T extends Record<string, any>> = (_: A) => Promise<T>

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const cache = <A extends string | number[], T extends Record<string, any>>(
  f: Func<A, T>
): Func<A, T> => {
  return async (arg: A) => {
    const argStr = Array.isArray(arg) ? arg.map(x => x.toString()).join('_') : arg
    const path = `${__dirname}/cache/${argStr}.json`
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
