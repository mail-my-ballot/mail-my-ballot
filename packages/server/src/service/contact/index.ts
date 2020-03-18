import { floridaContacts } from './florida'
import * as michigan from './michigan'
import { Contact, State, Locale } from '../../common'

export const toContact = <S extends State>({state, county, city}: Locale<S>): Contact | null => {
  switch(state) {
    case 'Florida': return {state: 'Florida', ...floridaContacts[county]}
    case 'Michigan': return michigan.search(county, city)
    default: return null
  }
}
