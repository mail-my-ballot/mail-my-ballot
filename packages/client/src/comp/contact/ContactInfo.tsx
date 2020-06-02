import React from 'react'
import { ContactData, Locale, ImplementedState } from '../../common'
import styled from 'styled-components'
import { ContactModal } from './ContactModal'


type Props = React.PropsWithChildren<{
  locale: Locale<ImplementedState>
  contact: ContactData
}>

const ContacStyle = styled.div`
  font-size: 16px;
  line-height: 22px;
  margin-bottom: 20px;
`

const ContactField: React.FC<{name: string, val?: string}> = ({name, val}) => {
  if (!val) return null
  return <p><b>{name}:</b> {val}</p>
}

const ContactFields: React.FC<{name: string, val?: string[]}> = ({name, val}) => {
  if (!val || val.length === 0) return null
  return <ContactField name={name} val={val.join(',')}/>
}

const MutedLink = styled.a`
  color: rgba(0, 0, 0, 0.54);
  &:hover {
    color: #2196F3;
  }
`

export const ContactInfo: React.FC<Props> = ({
  locale, contact
}) => {
  const [open, setOpen] = React.useState<boolean>(false)

  return <ContacStyle>
    <p><b>Local Election Official Details.</b></p>
    <ContactField name={'Official'} val={contact.official}/>
    <ContactField name='City' val={contact.city}/>
    <ContactField name='County' val={contact.county}/>
    <ContactFields name='Email' val={contact.emails}/>
    <ContactFields name='Fax' val={contact.faxes}/>
    <ContactFields name='Phone' val={contact.phones}/>
    <p><MutedLink style={{color: ''}} onClick={() => setOpen(true)}>Wrong Election Official?</MutedLink></p>
    
    <ContactModal
      open={open}
      setOpen={setOpen}
      state={locale.state}
      contactKey={contact.key}
    />
  </ContacStyle>
}
