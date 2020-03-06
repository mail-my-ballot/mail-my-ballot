import React from 'react'
import styled from 'styled-components'

import { client } from '../lib/trpc'
import { AddressContainer } from '../lib/state'
import { RedOutline } from './util/RedOutline'

const Section = styled.div`
  margin-top: 2em
`

const ObjectTable = ({ obj, title }: React.PropsWithChildren<{obj: Object | null, title: string}>) => {
  return <Section>
    <h4>{title}</h4>
    { obj ? (
      <table className='mui-table'>
        <tr>
          <th>Key</th>
          <th>Value</th>
        </tr>
        <tbody>
        {
          Object.entries(obj).map(keyval => (<tr>
            <td style={{textAlign: 'right'}}>{keyval[0]}</td>
            <td>{keyval[1]}</td>
          </tr>))
        }
        </tbody>
      </table>
    ) : (
      <p style={{textAlign: 'center'}}>Object Empty</p>
    )}
    </Section>
}

const CheckAdd = () => {
  const [sum, setSum] = React.useState(0)

  client.add(2, 3).then(result => {
    switch (result.type) {
      case 'data': {
        setSum(result.data)
        break
      }
    }
  })

  return (
    <Section>
      <h4>Checking Add</h4>
      <p>2 + 3 = {sum}</p>
    </Section>
  )
}

const RawDevInfo = () => {
  const { address } = AddressContainer.useContainer()

  return <RedOutline>
    <h2>Dev Info</h2>
    <p>This only appears in development</p>
    <CheckAdd/>
    <ObjectTable title='Process Env' obj={process.env}/>
    <ObjectTable title='Address' obj={address}/>
  </RedOutline>
}

export const DevInfo = () => {
  if (process.env.NODE_ENV === 'development') {
    return <RawDevInfo/>
  } else {
    return null
  }
}
