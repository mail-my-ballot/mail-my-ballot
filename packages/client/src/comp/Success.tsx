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

const Title = styled.h1`
  padding-top: 50px;
  @media only screen and (max-width: 414px) {
    padding-top: 0px;
    font-size: 55px;
    margin-top: 50px;
  }
`

const Text = styled.p`
  margin-bottom: 16px;
  @media only screen and (max-width: 414px) {
    font-size: 28px;
    padding-right: 60px;
    padding-left: 60px;
  }
`

export const Success: React.FC = () => {
  const { pushStart } = useAppHistory()
  const { id } = useParams()

  return <div style={{paddingTop: '4em' }}>
    <Title>Success!</Title>
    <Text>You have successfully sent your Vote by Mail signup to your local election official.  You received a copy of this signup via email.</Text>
    {id && <Text>Your Confirmation ID is <b>{id}</b>.  You may save off a copy for your records if you wish.</Text>}
    <StyledPanel>
      <BlueH2>One Last Step ...</BlueH2>
      <Text>Check your inbox for the signup email and <b>Reply All</b> with &ldquo;<i>I confirm this request</i>&rdquo; to confirm with your local elections official.</Text>
    </StyledPanel>
    <RoundedButton color='primary' variant='raised' onClick={pushStart}>
      Start Over
    </RoundedButton>
  </div>
}
