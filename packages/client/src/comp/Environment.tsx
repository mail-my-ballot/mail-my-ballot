import React from 'react'

export const Environment = () => <>
  <h1> Environment Variables </h1>
  <ul>
    <li>NODE_ENV: {process.env.NODE_ENV}</li>
    <li>REACT_APP_ENVIRONMENT: {process.env.REACT_APP_ENVIRONMENT}</li>
    <li>REACT_APP_EMAIL_OFFICIALS: {process.env.REACT_APP_EMAIL_OFFICIALS}</li>
  </ul>
</>
