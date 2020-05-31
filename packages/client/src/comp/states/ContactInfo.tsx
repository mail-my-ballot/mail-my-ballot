import React from 'react'
import Modal from 'react-modal'
import { ContactData, Locale, ImplementedState } from '../../common'
import { client } from '../../lib/trpc'

type ContactInfoProps = React.PropsWithChildren<{
  locale: Locale<ImplementedState>
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
    return <p> We could not find the local eletions official for {localeString(locale)}.</p>
  }

  const texts = [
    (contact.official)
      ? `The local elections official for ${localeString(locale)} is ${contact.official}.`
      : `We were able to find the local eletions official for ${localeString(locale)}.`,
    'Unfortunately, they are one of the few that do not list an email or fax.',
    englishList('phone number', 'phone numbers', contact.phones),
    contact.url ? `Their email is ${contact.url}.` : ''
  ]

  return <p>{texts.join(' ')}</p>
}

const modalStyles = {
  content: {
    top                   : '50%',
    left                  : '50%',
    right                 : 'auto',
    bottom                : 'auto',  
    marginRight           : '-50%',
    width                 : '50%',
    transform             : 'translate(-50%, -50%)',
  }
}

interface Props {
  open: boolean
  setOpen: (_: boolean) => void
  state: ImplementedState
}

const ContactModal: React.FC<Props> = ({
  state,
  open,
  setOpen,
}) => {
  const [keys, setKeys] = React.useState<string[]>([])
  React.useEffect(() => {
    (async() => {
      const result = await client.fetchContacts(state)
      if (result.type === 'data') {
        setKeys(result.data)
      }
    })()
  }, [state])
  React.useEffect(() => Modal.setAppElement('body'))

  return <Modal
    isOpen={open}
    onRequestClose={() => setOpen(false)}
    contentLabel='Example Modal'
    style={modalStyles}
  >
    <h2>Select your election Official</h2>
    <ul>{keys.splice(0, 5).map((k, i) => <li key={i}>{k}</li>)}</ul>
  </Modal>
}

export const ContactInfo: React.FC<ContactInfoProps> = ({
  locale, contact
}) => {
  const [open, setOpen] = React.useState<boolean>(false)

  const texts = [
    `The local elections official for ${localeString(locale)} is ${contact.official}.`,
    englishList('email address', 'email addresses', contact.emails),
    englishList('fax number', 'fax numbers', contact.faxes),
    englishList('phone number', 'phone numbers', contact.phones),
  ]

  return <p>
    {texts.join(' ')}
    {' '}
    <a onClick={() => setOpen(true)}>Wrong Elections Official?</a>
    <ContactModal open={open} setOpen={setOpen} state={locale.state}/>
  </p>
}
