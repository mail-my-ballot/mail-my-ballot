export function processEnvOrThrow(key: string): string {
  const val = process.env[key]
  if (!val) throw new Error(`Need to set environment variable ${key}`)
  return val
}

export const isProd = (): boolean => (process.env.NODE_ENV === 'production')

export { WithoutId, WithId } from './util'
export { Address, uspsAddressTwoLines, uspsAddressOneLine } from './address'
export { IVbmRpc } from './trpc'
export { FloridaInfo, RegistrationInfo } from './states'
