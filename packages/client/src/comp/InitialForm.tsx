import React from 'react'
import Form from 'muicss/lib/react/form'
import Row from 'muicss/lib/react/row'
import Col from 'muicss/lib/react/col'
import Input from 'muicss/lib/react/input'

import { geocode } from '../lib/osm'
import { RoundedButton } from './util/Button'
import { client } from '../lib/trpc'
import { QueryContainer, AddressContainer, ContactContainer } from '../lib/state'
import { StateForm } from './states/StateForm'
import { useControlRef } from './util/ControlRef'
import { isProd } from '../common'
import { TimeoutError } from '@tianhuil/simple-trpc/dist/timedFetch'

const defaultAddr = (isProd()
  ? undefined
  : '2125 Butterfield Rd, Troy, MI 48084'
)

export const InitialForm: React.StatelessComponent = () => {
  const addrRef = useControlRef<Input>()
  const unitRef = useControlRef<Input>()
  const { setAddress } = AddressContainer.useContainer()
  const { load, error, success } = QueryContainer.useContainer()
  const { setContact } = ContactContainer.useContainer()

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.persist()  // allow async function call
    event.preventDefault()

    if (!addrRef.current || !unitRef.current) return

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
    <Form onSubmit={handleSubmit}>
      <legend>Enter your address to see if you qualify for Vote by Mail</legend>
      <Row>
        <Col sm={10} xs={12}>
          <Input
            id='addr'
            label='Address (without Apt or Unit #)'
            floatingLabel={true}
            ref={addrRef}
            defaultValue={defaultAddr}
          />
        </Col>
        <Col sm={2} xs={12}>
          <Input
            id='unit'
            label='Unit #'
            floatingLabel={true}
            ref={unitRef}
          />
        </Col>
      </Row>
      <RoundedButton color='primary' variant='raised' data-testid='initialform-submit'>Can I vote by Mail?</RoundedButton>
    </Form>
    <StateForm />
  </>
}
