export function processEnvOrThrow(key: string): string {
  const val = process.env[key]
  if (!val) throw new Error(`Need to set environment variable ${key}`)
  return val
}

export const isProd = (): boolean => (process.env.NODE_ENV === 'production')

export * from './util'
export * from './address'
export * from './trpc'
export * from './states'
