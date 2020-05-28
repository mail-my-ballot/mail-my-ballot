import React from 'react'
import { useParams } from 'react-router-dom'
import styled from 'styled-components'

import { RoundedButton } from './util/Button'
import { useAppHistory } from '../lib/path'
import { StyledPanel } from './util/Panel'

const BlueH2 = styled.h2`
  color: #2196F3;
  margin-top: 0;
`

export const Success: React.FC = () => {
  const { pushStart } = useAppHistory()
  const { id } = useParams()

  return <div style={{paddingTop: '4em' }}>
    <h1>Success!</h1>
    <p>You have successfully sent your Vote by Mail signup to your local election official.  You received a copy of this signup via email.</p>
    {id && <p>Your Confirmation ID is <b>{id}</b>.  You may save off a copy for your records if you wish.</p>}
    <StyledPanel>
      <BlueH2>One Last Step ...</BlueH2>
      <p>Check your inbox for the signup email and <b>Reply All</b> with &ldquo;<i>I confirm this request</i>&rdquo; to confirm with your local elections official.</p>
    </StyledPanel>
    <RoundedButton color='primary' variant='raised' onClick={pushStart}>
      Start Over
    </RoundedButton>
  </div>
}
