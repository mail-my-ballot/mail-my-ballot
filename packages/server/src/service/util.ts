import fs from 'fs'


interface Options{
  refresh?: boolean
  workDir?: string
  encoding?: BufferEncoding
}
type AsyncFunc<A extends unknown[], R> = (...args: A) => Promise<R>

export const cache = <A extends unknown[], R>(
  func: AsyncFunc<A, R>,
  namer: AsyncFunc<A, string>,
  options?: Options,
): AsyncFunc<A, R> => {
  const refresh   = options?.refresh  ?? false,
        workDir   = options?.workDir  ?? `${__dirname}/cache/`,
        encoding  = options?.encoding ?? 'utf-8'

  return async (...args: A): Promise<R> => {
    const path = workDir + '/' + await namer(...args)
    if (fs.existsSync(path) && !refresh) {
      const data = await fs.promises.readFile(path, { encoding } )
      return JSON.parse(data)
    } else {
      const ret = await func(...args)
      const data = JSON.stringify(ret)
      fs.writeFileSync(path, data, { encoding })
      return JSON.parse(data)
    }
  }
}
