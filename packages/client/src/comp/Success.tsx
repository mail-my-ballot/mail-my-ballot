import React from 'react'

import { RoundedButton } from './util/Button'
import { Link } from 'react-router-dom'

export const Success = () => {
  const confirmationId = window.location.hash

  return <>
    <h1>Congratulations!</h1>
    <p>You have now successfully submitted a Vote by Mail application.  Check your email for the application.</p>
    { (confirmationId) ? (
      <p>Your Confirmation ID is <b>{confirmationId}</b>.  You may save off a copy for your records if you wish.</p>
    ) : (
      null
    )}
    <Link to='/'>
      <RoundedButton color='primary' variant='raised'>
        Start Over
      </RoundedButton>
    </Link>
  </>
}
