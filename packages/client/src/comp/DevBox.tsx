import React from 'react'
import styled from 'styled-components'

import { client } from '../lib/trpc'
import { AddressContainer } from '../lib/state'

const DevOutline = styled.div`
  border-color: red;
  border-style: solid;
  border-width: thin;
  padding: 2em;
  margin: 2em 0em;
`

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

const _DevBox = () => {
  const [sum, setSum] = React.useState(0)
  const { address } = AddressContainer.useContainer()
  client.add(2, 3).then(result => {
    switch (result.type) {
      case 'data': {
        setSum(result.data)
        break
      }
    }
  })

  return <DevOutline>
    <h2>Dev Box</h2>
    <p>This only appears in development</p>
    <Section>
      <h4>Checking add</h4>
      <p>2 + 3 = {sum}</p>
    </Section>
    <ObjectTable title='Process Env' obj={process.env}/>
    <ObjectTable title='Address' obj={address}/>
  </DevOutline>
}

export const DevBox = () => {
  if (process.env.NODE_ENV === 'development') {
    return <_DevBox/>
  } else {
    return null
  }
}
