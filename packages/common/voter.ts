// From here: https://ga-dev-tools.appspot.com/campaign-url-builder/
export interface UTM {
  utmSource?: string
  utmMedium?: string
  utmCampaign?: string
  utmTerm?: string
  utmContent?: string
}

export interface Voter extends UTM {
  uid: string
}
