import React from 'react'
import { useParams } from 'react-router-dom'
import styled from 'styled-components'

import { SocialShare } from './SocialShare'
import { RoundedButton } from './util/Button'
import { useAppHistory } from '../lib/path'
import { StyledPanel } from './util/Panel'
import { Center } from './util/Util'

const BlueH2 = styled.h2`
  color: #2196F3;
  margin-top: 0;
`

export const Success: React.FC = () => {
  const { pushStart } = useAppHistory()
  const { id } = useParams()

  return <div>
    <h1>Success!</h1>
    <p>You have successfully sent your Vote by Mail signup to your local election official.  We emailed you a copy as well.</p>
    {id && <p>Your Confirmation ID is <b>{id}</b>.</p>}
    <SocialShare/>
    <StyledPanel>
      <BlueH2>One Last Step ...</BlueH2>
      <p>Check your inbox for the signup email and <b>Reply All</b> with &ldquo;<i>I confirm this request.</i>&rdquo;  (This is not strictly necessary but election officials appreciate the confirmation.)</p>
    </StyledPanel>
    <Center>
      <RoundedButton color='primary' variant='raised' onClick={pushStart}>
        Start Over
      </RoundedButton>
    </Center>
  </div>
}
