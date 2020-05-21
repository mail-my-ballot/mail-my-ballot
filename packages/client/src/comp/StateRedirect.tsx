import React from 'react'
import { useAppHistory } from '../lib/path'
import { client } from '../lib/trpc'
import { AddressContainer, ContactContainer } from '../lib/unstated'

export const StateRedirect = () => {
  const { pushState, pushStart, query } = useAppHistory()
  const addr = query.addr
  const { setAddress } = AddressContainer.useContainer()
  const { setContact } = ContactContainer.useContainer()

  React.useEffect(() => {
    (async () => {
      const result = await client.fetchContactAddress(addr)
      if (result.type === 'data') {
        const { address, contact } = result.data
        setAddress(address)
        setContact(contact)
        return pushState(address.state)
      } else {
        return pushStart()
      }
    })()
  }, [])
  return <></>
}
