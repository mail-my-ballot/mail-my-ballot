import React from 'react'
import { useAppHistory } from '../lib/path'
import { client } from '../lib/trpc'
import { AddressContainer, ContactContainer } from '../lib/unstated'

export const StateRedirect = () => {
  const { pushState, pushStart, query } = useAppHistory()
  const { registrationAddress } = query
  const { setAddress } = AddressContainer.useContainer()
  const { setContact } = ContactContainer.useContainer()

  React.useEffect(() => {
    if (!registrationAddress) { return pushStart() }
    (async () => {
      const result = await client.fetchContactAddress(registrationAddress)
      if (result.type === 'data') {
        const { address, contact } = result.data
        setAddress(address)
        setContact(contact)
        return pushState(address.state)
      } else {
        return pushStart()
      }
    })()
  }, [registrationAddress, pushStart, pushState, setAddress, setContact])
  return <></>
}
