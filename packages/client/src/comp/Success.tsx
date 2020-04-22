import React from 'react'

import { RoundedButton } from './util/Button'
import { useAppHistory } from '../lib/path'
import { useParams } from 'react-router-dom'
import Panel from 'muicss/lib/react/panel'
import styled from 'styled-components'

const AppPanel = styled(Panel)`
  border-radius: 2em;
  padding: 2em 2em;
  margin: 2em 0;
`

export const Success: React.FC = () => {
  const { pushStart } = useAppHistory()
  const { id } = useParams()

  return <div style={{paddingTop: '4em' }}>
    <h1>Success!</h1>
    <p>You have now successfully applied for Vote by Mail to your local election official.  You received a copy of this email.</p>
    {id && <p>Your Confirmation ID is <b>{id}</b>.  You may save off a copy for your records if you wish.</p>}
    <AppPanel>
      <h2 style={{color: '#2196F3', marginTop: '0'}}>One Last Step ...</h2>
      <p>Check your inbox for the application email and <b>Reply All</b> with &ldquo;<i>I confirm this request</i>&rdquo; to confirm with your local elections official.</p>
    </AppPanel>
    <RoundedButton color='primary' variant='raised' onClick={pushStart}>
      Start Over
    </RoundedButton>
  </div>
}
