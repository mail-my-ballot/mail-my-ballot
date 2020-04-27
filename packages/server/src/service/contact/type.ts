import { Locale, ContactData, AvailableState } from "../../common"

type Localize<T> = T extends Partial<Locale> ? Pick<T, keyof Locale> : never
export type ContactLocale = Localize<ContactData>


export type RawContactRecord = Record<AvailableState, ContactData[]>

export type ContactRecord = Record<AvailableState, Record<string, ContactData>>
