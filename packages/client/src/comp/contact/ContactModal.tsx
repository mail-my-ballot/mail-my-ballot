import React from 'react'
import Select from 'muicss/lib/react/select'
import Option from 'muicss/lib/react/option'
import Modal from 'styled-react-modal'
import { ImplementedState } from '../../common'
import { client } from '../../lib/trpc'
import { RoundedButton } from '../util/Button'
import { useControlRef } from '../util/ControlRef'
import { ContactContainer } from '../../lib/unstated'
import { AppForm } from '../util/Form'

const StyledModal = Modal.styled`
  top: 50%;
  left: 50%;
  right: auto;
  bottom: auto;
  marginRight: 50%;
  width: 50%;
  transform: 'translate(-50%, -50%)';
  background-color: white;
  padding: 40px;
  @media only screen and (max-width: 544px) {
    padding: 20px;
    width: 80%;
  }
`

interface Props {
  open: boolean
  setOpen: (_: boolean) => void
  state: ImplementedState
  contactKey: string
}

// from https://stackoverflow.com/a/196991/8930600
const toTitleCase = (str: string) => {
  return str.replace(
    /\w*/g,
    (word: string) => word.charAt(0).toUpperCase() + word.substr(1).toLowerCase()
  )
}

const jurisdictionName = (contactKey: string) => {
  const [city, county] = contactKey.split(':').map(toTitleCase)
  if (city === '') return county
  if (county === '') return city
  return `${city} (${county})`
}

export const ContactModal: React.FC<Props> = ({
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

  const handleSubmit = async (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    event.preventDefault()
    const newContactKey = contactRef.value()
    if (!newContactKey || newContactKey === contactKey) return
    const result = await client.getContact(state, newContactKey)
    if (result.type === 'data') {
      setContact(result.data)
      setOpen(false)
    }
  }

  return <StyledModal
    isOpen={open}
    onBackgroundClick={() => setOpen(false)}
    onEscapeKeydown={() => setOpen(false)}
  >
    <h4>Select Election Jurisdiction</h4>
    <AppForm>
      <Select ref={contactRef} label='Select Jurisdiction' defaultValue={contactKey}>
        {contactKeys.sort().map((contactKey, idx) => {
          return <Option
            value={contactKey}
            key={idx}
            label={jurisdictionName(contactKey)}
          />
        })}
      </Select>
      <RoundedButton onClick={handleSubmit} color='primary'>Select</RoundedButton>
    </AppForm>
  </StyledModal>
}
