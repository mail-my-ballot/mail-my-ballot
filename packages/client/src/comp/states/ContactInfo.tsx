import React from 'react'
import styled from 'styled-components'
import { ContactData, Locale } from '../../common'

const Text = styled.p`
  margin-bottom: 16px;
  @media only screen and (max-width: 414px) {
    font-size: 28px;
    padding-right: 60px;
    padding-left: 60px;
  }
`

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

const localeString = ({city, county, state}: Locale) => {
  return `${city}, ${state}` + (county ? ` (${county})` : '')
}

export const InvalidContact: React.FC<InvalidContactProps> = ({
  locale, contact
}) => {
  if (!contact) {
    return <Text> We could not find the local eletions official for {localeString(locale)}.</Text>
  }

  const texts = [
    (contact.official)
      ? `The local elections official for ${localeString(locale)} is ${contact.official}.`
      : `We were able to find the local eletions official for ${localeString(locale)}.`,
    'Unfortunately, they are one of the few that do not list an email or fax.',
    englishList('phone number', 'phone numbers', contact.phones),
    contact.url ? `Their email is ${contact.url}.` : ''
  ]

  return <Text>{texts.join(' ')}</Text>
}

export const ContactInfo: React.FC<ContactInfoProps> = ({
  locale, contact
}) => {
  const texts = [
    `The local elections official for ${localeString(locale)} is ${contact.official}.`,
    englishList('email address', 'email addresses', contact.emails),
    englishList('fax number', 'fax numbers', contact.faxes),
    englishList('phone number', 'phone numbers', contact.phones),
  ]

  return <Text>{texts.join(' ')}</Text>
}
