import React from 'react'

import { RoundedButton } from './util/Button'
import { Link } from 'react-router-dom'

export const Success = () => {
  const confirmationId = window.location.hash

  return <>
    <h1>Congratulations!</h1>
    <p>You have now successfully submitted a Vote by Mail application.</p>
    <p>Check your email for the application (may be in spam) and &ldquo;Reply All&rdquo; to send it to your county official.</p>
    { (confirmationId) ? (
      <p>Your Confirmation ID is <b>{confirmationId}</b>.  You may save off a copy for your records if you wish.</p>
    ) : (
      null
    )}
    <Link to='/#app'>
      <RoundedButton color='primary' variant='raised'>
        Start Over
      </RoundedButton>
    </Link>
  </>
}
