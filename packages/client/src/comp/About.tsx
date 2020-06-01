import React from 'react'
import { processEnvOrThrow } from '../common'
import Row from 'muicss/lib/react/row'
import Col from 'muicss/lib/react/col'
import { useAppHistory } from '../lib/path'
import { RoundedButton } from './util/Button'

export const About = () => {
  const brandName = processEnvOrThrow('REACT_APP_BRAND_NAME')
  const url = processEnvOrThrow('REACT_APP_URL')
  const { pushStart } = useAppHistory()

  return <div>
    <Row>
      <Col xs={12} md={8} md-offset={2} lg={6} lg-offset={3}>
        <h1>About Us</h1>
        <p>
          COVID-19 has catalyzed interest in Vote by Mail (VBM).  <a href={url}>{brandName}</a> streamlines government VBM applications by digitizing the voter’s VBM signup process.  The mobile-friendly website drives voter turnout in key swing states by helping organizers sign up voters for VBM.
        </p>
        <p>
          <a href={url}>{brandName}</a> is a <a href='https://voteathome.org'>Vote at Home</a> project.
          Vote at Home is a non-partisan 501(c)3 that empowers voters, letting them decide when, how and where they vote.
        </p>
        <RoundedButton color='primary' variant='raised' onClick={pushStart}>
          Get Started
        </RoundedButton>
      </Col>
    </Row>
  </div>
}
