import React from 'react'
import { ContactData, Locale } from '../../common'

type ContactInfoProps = React.PropsWithChildren<{
  locale: Locale
  contact: ContactData
}>

type InvalidContactProps = React.PropsWithChildren<{
  locale: Locale
  contact: ContactData | null
}>

const englishList = (singular: string, plural: string, items: string[] | undefined) => {
  if (!items) {
    return ''
  }
  switch (items.length) {
    case 0: return ''
    case 1: return `Their ${singular} is ${items[0]}.`
    default: return `Their ${plural} are ${items.join(', ')}.`
  }
}

export const InvalidContact: React.FC<InvalidContactProps> = ({
  locale, contact
}) => {
  if (!contact) {
    return <p> We could not find the local eletions official for {locale.city}, {locale.state} in {locale.county}.</p>
  }

  const texts = [
    (contact.official)
      ? `The local elections official for ${locale.city}, ${locale.state} in ${locale.county} is ${contact.official}.`
      : `We were able to find the local eletions official for ${locale.city}, ${locale.state} in ${locale.county}.`,
    'Unfortunately, they are one of the few that do not list an email or fax.',
    englishList('phone number', 'phone numbers', contact.phones),
    contact.url ? `Their email is ${contact.url}.` : ''
  ]

  return <p>{texts.join(' ')}</p>
}


export const ContactInfo: React.FC<ContactInfoProps> = ({
  locale, contact
}) => {
  const texts = [
    `The local elections official for ${locale.city}, ${locale.state} in ${locale.county} is ${contact.official}.`,
    englishList('email address', 'email addresses', contact.phones),
    englishList('fax number', 'fax numbers', contact.phones),
    englishList('phone number', 'phone numbers', contact.phones),
  ]

  return <p>{texts.join(' ')}</p>
}
