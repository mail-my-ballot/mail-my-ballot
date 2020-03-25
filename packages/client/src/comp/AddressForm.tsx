import React from 'react'
import Form from 'muicss/lib/react/form'
import Row from 'muicss/lib/react/row'
import Col from 'muicss/lib/react/col'
import Input from 'muicss/lib/react/input'

import { geocode } from '../lib/osm'
import { RoundedButton } from './util/Button'
import { client } from '../lib/trpc'
import { QueryContainer, AddressContainer, ContactContainer } from '../lib/state'
import { useControlRef } from './util/ControlRef'
import { TimeoutError } from '@tianhuil/simple-trpc/dist/timedFetch'
import { BaseInput } from './util/Input'
import { StatusReport } from './status/StatusReport'
import { useParams } from 'react-router-dom'
import { useAppHistory } from '../lib/history'
import { Notification } from './Notification'


const defaultAddr = (process.env.REACT_APP_DEFAULT_ADDRESS
  ? '2125 Butterfield Rd, Troy, MI 48084'
  : undefined
)

// pulled out for testing
export const RawAddressForm: React.FC<{state: string}> = ({state}) => {
  const { pushStateForm } = useAppHistory()
  const addrRef = useControlRef<Input>()
  const unitRef = useControlRef<Input>()
  const { load, error, success } = QueryContainer.useContainer()
  const { setAddress } = AddressContainer.useContainer()
  const { setContact } = ContactContainer.useContainer()

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.persist()  // allow async function call
    event.preventDefault()

    if (!addrRef.current) throw Error('address ref not set')
    if (!unitRef.current) throw Error('unit ref not set')
    if (!state) throw Error('state not set in AddressForm.handleSubmit')

    load('Fetching information about your address')
    try {
      const addrInput = addrRef.value()
      const address = await geocode(addrRef.value(), unitRef.value())
      setAddress(address)

      if (!address) {
        error(<><b>Address Error:</b> No address found for {addrInput}</>)
        return
      }

      const result = await client.addAddress(address)
      switch(result.type) {
        case 'data': {
          const { id, contact } = result.data
          setAddress({...address, id})
          setContact(contact)
          break
        }
        case 'error': {
          error(<><b>Server Error:</b> {result.message}</>)
          break
        }
      }
      await success(<><b>Success</b> fetching information about your address</>)
      pushStateForm(state)
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

  return <>
    <StatusReport state={state}>
      <Form onSubmit={handleSubmit}>
        <legend>Enter your address to find your local election official</legend>
        <p></p>
        <Row>
          <Col sm={10} xs={12}>
            <BaseInput
              id='addr'
              label='Address (without Apt or Unit #)'
              ref={addrRef}
              defaultValue={defaultAddr}
            />
          </Col>
          <Col sm={2} xs={12}>
            <BaseInput id='unit'
              label='Unit #'
              ref={unitRef}
            />
          </Col>
        </Row>
        <RoundedButton color='primary' variant='raised' data-testid='submit'>Can I vote by Mail?</RoundedButton>
      </Form>
      <Notification/>
    </StatusReport>
  </>
}

export const AddressForm = () => {
  const { state } = useParams()
  if (!state) throw Error('state not set in AddressForm')
  return <RawAddressForm state={state}/>
}
