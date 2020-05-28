import React from 'react'
import { useParams } from 'react-router-dom'
import styled from 'styled-components'

import { H1, P } from './util/Text'
import { RoundedButton } from './util/Button'
import { useAppHistory } from '../lib/path'
import { StyledPanel } from './util/Panel'

const BlueH2 = styled.h2`
  color: #2196F3;
  margin-top: 0;
`

const Container = styled.div`
  paddingTop: '4em';

  @media only screen and (max-width: 414px) {
    align-items: center;
    align-content: center;
    display: flex;
    flex-direction: column;
  }
`

export const Success: React.FC = () => {
  const { pushStart } = useAppHistory()
  const { id } = useParams()

  return <Container>
    <H1>Success!</H1>
    <P>You have successfully sent your Vote by Mail signup to your local election official.  You received a copy of this signup via email.</P>
    {id && <P>Your Confirmation ID is <b>{id}</b>.  You may save off a copy for your records if you wish.</P>}
    <StyledPanel>
      <BlueH2>One Last Step ...</BlueH2>
      <P>Check your inbox for the signup email and <b>Reply All</b> with &ldquo;<i>I confirm this request</i>&rdquo; to confirm with your local elections official.</P>
    </StyledPanel>
    <RoundedButton color='primary' variant='raised' onClick={pushStart}>
      Start Over
    </RoundedButton>
  </Container>
}
