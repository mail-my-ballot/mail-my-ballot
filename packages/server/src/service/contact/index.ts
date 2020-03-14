import { floridaContacts } from './florida'
import { michiganContacts } from './michigan'
import { Contact, State, Locale, FloridaContact } from '../../common'

export const getContact = <S extends State>({state, county, city}: Locale<S>): Contact | null => {
  const addState = <T>(state: S, obj: T): T & {state: S} => ({state, ...obj})

  switch(state) {
    case 'Florida': return {state: 'Florida', ...floridaContacts[county]}
    case 'Michigan': return {state: 'Michigan', ...michiganContacts[county + ':' + city]}
    default: return null
  }
}
