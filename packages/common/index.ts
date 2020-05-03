export const processEnvOrThrow = (key: string): string => {
  const val = process.env[key]
  if (!val) throw new Error(`Need to set environment variable ${key}`)
  return val
}

export const emailOfficials = (): boolean => (!!process.env.REACT_APP_EMAIL_OFFICIALS)

export * from './util'
export * from './address'
export * from './osm'
export * from './trpc'
export * from './states'
export * from './vbmStatus'
export * from './contact'
export * from './locale'
export * from './analytics'
export * from './util'
export * from './sampleAddresses'
