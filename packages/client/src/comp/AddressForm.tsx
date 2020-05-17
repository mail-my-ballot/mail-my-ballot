import React from 'react'
import Form from 'muicss/lib/react/form'
import Input from 'muicss/lib/react/input'

import { RoundedButton } from './util/Button'
import { client } from '../lib/trpc'
import { QueryContainer, AddressContainer, ContactContainer } from '../lib/unstated'
import { useControlRef } from './util/ControlRef'
import { TimeoutError } from '@tianhuil/simple-trpc/dist/timedFetch'
import { BaseInput } from './util/Input'
import { StatusReport } from './status/StatusReport'
import { useParams } from 'react-router-dom'
import { useAppHistory } from '../lib/path'
import styled from 'styled-components'
import { sampleAddresses, ImplementedState } from '../common'

const defaultAddr = (state: string) => {
  if (process.env.REACT_APP_DEFAULT_ADDRESS) {
    const addresses = sampleAddresses[state as ImplementedState] ?? []
    return addresses[0]?.address ?? ''
  } else {
    return ''
  }
}

const FlexBox = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: flex-end;
  flex-wrap: wrap;
  align-items: center;
`

const FlexGrow = styled.div`
  flex-grow: 1;
  min-width: 250px;
`

const FlexFixed = styled.div`
  flex-grow: 0;
  margin-left: 2em;
`

// pulled out for testing
export const RawAddressForm: React.FC<{state: string}> = ({state}) => {
  const { pushState } = useAppHistory()
  const addrRef = useControlRef<Input>()
  const { load, error, success } = QueryContainer.useContainer()
  const { setAddress } = AddressContainer.useContainer()
  const { setContact } = ContactContainer.useContainer()

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.persist()  // allow async function call
    event.preventDefault()

    const addrInput = addrRef.value()
    if (addrInput === null) throw Error('address ref not set')

    load('Fetching information about your address')
    try {
      setContact(null)
      setAddress(null)
      const result = await client.fetchContactAddress(addrInput)
      switch(result.type) {
        case 'data': {
          const {contact, address} = result.data
          setContact(contact)
          setAddress(address)
          break
        }
        case 'error': {
          error(<><b>Server Error:</b> {result.message}</>)
          return
        }
      }
      pushState(state)
      await success(<><b>Success</b> fetching information about your address</>)
    } catch(e) {
      if (e instanceof TimeoutError) {
        error(<><b>Timeout Error:</b> Try resubmitting.  If this persists, try again in a little while.</>)
      } else if (e instanceof TypeError) {
        error(<><b>Connection Error:</b> Try resubmitting.  If this persists, try again in a little while.</>)
      } else {
        throw e
      }
    }
  }

  return <div style={{paddingTop: '4em' }}>
    <StatusReport state={state}>
      <Form onSubmit={handleSubmit}>
        <legend>Enter your address to find your local election official</legend>
        <p></p>
        <FlexBox>
          <FlexGrow>
            <BaseInput
              id='addr-input'  // This id is used for Warning Box to fill form quickly
              label='Address'
              ref={addrRef}
              defaultValue={defaultAddr(state)}
            />
          </FlexGrow>
          <FlexFixed>
            <RoundedButton
              id='addr-submit'  // This id is used for Warning Box to submit form quickly
              color='primary'
              variant='raised'
              data-testid='submit'
              style={{flexGrow: 0}}
            >Can I vote by Mail?
            </RoundedButton>
          </FlexFixed>
        </FlexBox>
      </Form>
    </StatusReport>
  </div>
}

export const AddressForm = () => {
  const { state } = useParams()
  if (!state) throw Error('state not set in AddressForm')
  return <RawAddressForm state={state}/>
}
