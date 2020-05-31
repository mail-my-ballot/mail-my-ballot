import React from 'react'
import Select from 'muicss/lib/react/select'
import Option from 'muicss/lib/react/option'
import Modal from 'react-modal'
import { ContactData, Locale, ImplementedState } from '../../common'
import { client } from '../../lib/trpc'
import { RoundedButton } from '../util/Button'
import Form from 'muicss/lib/react/form'
import { useControlRef } from '../util/ControlRef'
import { ContactContainer } from '../../lib/unstated'
import styled from 'styled-components'
import Panel from 'muicss/lib/react/panel'


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
      : `We were able to find the local election official for ${localeString(locale)}.`,
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
  contactKey: string
}

// from https://stackoverflow.com/a/196991/8930600
const toTitleCase = (str: string) => {
  return str.replace(
    /\w\S*/g,
    (word: string) => word.charAt(0).toUpperCase() + word.substr(1).toLowerCase()
  )
}

const jurisdictionName = (contactKey: string) => {
  const [city, county] = toTitleCase(contactKey).split(':')
  if (city === '') return county
  if (county === '') return city
  return `${city} (${county})`
}

const ContactPanel = styled(Panel)`
  font-size: 16px;
  line-height: 22px;
`

const ContactModal: React.FC<Props> = ({
  state,
  open,
  setOpen,
  contactKey,
}) => {
  const [contactKeys, setLocaleKeys] = React.useState<string[]>([])
  const contactRef = useControlRef<Select>()
  const { setContact } = ContactContainer.useContainer()

  React.useEffect(() => {
    (async() => {
      const result = await client.fetchContacts(state)
      if (result.type === 'data') {
        setLocaleKeys(result.data)
      }
    })()
  }, [state])
  React.useEffect(() => Modal.setAppElement('body'))

  const handleSubmit = async () => {
    const newContactKey = contactRef.value()
    if (!newContactKey || newContactKey === contactKey) return
    const result = await client.getContact(state, newContactKey)
    if (result.type === 'data') {
      setContact(result.data)
      setOpen(false)
    }
  }

  return <Modal
    isOpen={open}
    onRequestClose={() => setOpen(false)}
    contentLabel='Example Modal'
    style={modalStyles}
  >
    <h3>Select Election Jurisdiction</h3>
    <Form onSubmit={handleSubmit}>
      <Select ref={contactRef} label='Select Jurisdiction' defaultValue={contactKey}>
        {contactKeys.sort().map((contactKey, idx) => {
          return <Option
            value={contactKey}
            key={idx}
            label={jurisdictionName(contactKey)}
          />
        })}
      </Select>
      <RoundedButton color='primary'>Select</RoundedButton>
    </Form>
  </Modal>
}

const ContactField: React.FC<{name: string, val?: string}> = ({name, val}) => {
  if (!val) return null
  return <p><b>{name}:</b> {val}</p>
}

const ContactFields: React.FC<{name: string, val?: string[]}> = ({name, val}) => {
  if (!val || val.length === 0) return null
  return <ContactField name={name} val={val.join(',')}/>
}

export const ContactInfo: React.FC<ContactInfoProps> = ({
  locale, contact
}) => {
  const [open, setOpen] = React.useState<boolean>(false)

  return <ContactPanel>
    <h4>Local Election Official Details</h4>
    <ContactField name={'Official'} val={contact.official}/>
    <ContactField name='City' val={contact.city}/>
    <ContactField name='County' val={contact.county}/>
    <ContactFields name='Email' val={contact.emails}/>
    <ContactFields name='Fax' val={contact.faxes}/>
    <ContactFields name='Phone' val={contact.phones}/>
    <a onClick={() => setOpen(true)}>Wrong Elections Official?</a>
    <ContactModal
      open={open}
      setOpen={setOpen}
      state={locale.state}
      contactKey={contact.key}
    />
  </ContactPanel>
}
