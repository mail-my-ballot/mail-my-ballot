import React from 'react'
import styled from 'styled-components'

import { client } from '../lib/trpc'
import { AddressContainer } from '../lib/unstated'
import { RedOutline } from './util/RedOutline'

const Section = styled.div`
  margin-top: 2em
`

// eslint-disable-next-line @typescript-eslint/no-explicit-any
type Props = React.PropsWithChildren<{obj: Record<string, any> | null, title: string}>

const ObjectTable = ({ obj, title }: Props) => {
  return <Section>
    <h4>{title}</h4>
    { obj ? (
      <table className='mui-table'>
        <tbody>
        {
          Object.entries(obj).map((keyval, i) => (<tr key={i}>
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
  React.useEffect(() => {
    client.add(2, 3).then(result => {
      switch (result.type) {
        case 'data': {
          setSum(result.data)
          break
        }
      }
    })
  }, [])
  

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
    <h1>Dev Info</h1>
    <p>This only appears in development</p>
    <CheckAdd/>
    <ObjectTable title='Process Env' obj={process.env}/>
    <ObjectTable title='Address' obj={address}/>
  </RedOutline>
}

export const DevInfo = () => (
  process.env.REACT_APP_SHOW_DEV_INFO ? <RawDevInfo/> : null
)
