import React from 'react'
import { useAppHistory } from '../lib/path'
import { client } from '../lib/trpc'
import { AddressContainer, ContactContainer } from '../lib/unstated'

export const StateRedirect = () => {
  const { pushState, pushStart, query } = useAppHistory()
  const { addr, ...queryRest } = query
  const { setAddress } = AddressContainer.useContainer()
  const { setContact } = ContactContainer.useContainer()

  React.useEffect(() => {
    if (!addr) { return pushStart() }
    (async () => {
      const result = await client.fetchContactAddress(addr)
      if (result.type === 'data') {
        const { address, contact } = result.data
        setAddress(address)
        setContact(contact)
        return pushState(address.state, queryRest)
      } else {
        return pushStart()
      }
    })()
  }, [addr, pushStart, pushState, setAddress, setContact])
  return <></>
}
