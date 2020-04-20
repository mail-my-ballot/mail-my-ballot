import React from 'react'

import { RoundedButton } from './util/Button'
import { useAppHistory } from '../lib/path'
import { useParams } from 'react-router-dom'

export const Success: React.FC = () => {
  const { pushStart } = useAppHistory()
  const { id } = useParams()

  return <div style={{paddingTop: '4em' }}>
    <h1>Success!</h1>
    <p>You have now successfully submitted a Vote by Mail application to your local elections official.</p>
    <p>Check your inbox for the application email and <b>Reply All</b> with &ldquo;<i>I confirm this request</i>&rdquo; to confirm with your local elections official.</p>
    {id && <p>Your Confirmation ID is <b>{id}</b>.  You may save off a copy for your records if you wish.</p>}
    <RoundedButton color='primary' variant='raised' onClick={pushStart}>
      Start Over
    </RoundedButton>
  </div>
}
