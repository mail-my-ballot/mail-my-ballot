export interface User {
  displayName: string
  name?: {
      familyName: string
      givenName: string
      middleName?: string
  }
  emails: Array<{
      value: string
      type?: string
  }>
  accessToken: string
  refreshToken: string
  roles: Array<string>
}

export interface Role {
  org: string
  admin: boolean
  pending?: boolean
}
