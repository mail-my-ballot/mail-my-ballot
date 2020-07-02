import React from 'react'
import { processEnvOrThrow } from '../common'
import { useAppHistory } from '../lib/path'
import { RoundedButton } from './util/Button'
import { SocialFollow } from './SocialFollow'
import { SocialShare, SocialButtonWrapper } from './SocialShare'
import { Row, Col } from 'muicss/react'

export const About = () => {
  const brandName = processEnvOrThrow('REACT_APP_BRAND_NAME')
  const url = processEnvOrThrow('REACT_APP_URL')
  const { pushStartSection } = useAppHistory()

  return <div>
    <h1>About Us</h1>
    <p>
      COVID-19 has catalyzed interest in Vote by Mail (VBM).  <a href={url}>{brandName}</a> streamlines government VBM applications by digitizing the voter’s VBM signup process.  The mobile-friendly website drives voter turnout in key swing states by helping organizers sign up voters for VBM.
    </p>
    <SocialButtonWrapper>
      <RoundedButton
        color='primary'
        variant='raised'
        onClick={() => pushStartSection('start')}
      >
        <span>Get Started</span>
      </RoundedButton>
    </SocialButtonWrapper>
    <Row>
      <Col md={6} style={{ textAlign: 'center' }}>
        <h3>Follow</h3>
        <SocialFollow/>
      </Col>
      <Col md={6} style={{ textAlign: 'center' }}>
        <h3>Share</h3>
        <SocialShare/>
      </Col>
    </Row>
  </div>
}
