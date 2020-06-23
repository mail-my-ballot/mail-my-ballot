import React from 'react'
import styled from 'styled-components'
import { EnterZip } from './util/EnterZip'
import { Row, Col, Container } from 'muicss/react'

import iconPen from './img/hiw_icon_pen.svg'
import iconBallot from './img/hiw_icon_ballot.svg'
import iconPlane from './img/hiw_icon_plane.svg'
import { cssQuery } from './util/cssQuery'
import { FullscreenWrapper } from './util/FullscreenWrapper'

const Wrapper = styled(FullscreenWrapper)`
  background-color: #fafafa;

  form { margin: 1.5em 0; }
`

const Headline = styled.div`
  text-align: center;
  p { margin: 1em 0 2em; }
  ${cssQuery.desktop.all} {
    width: 55%;
  }
`

const Steps = styled(Row)`
  width: 100%;
  margin: 0;

  ${cssQuery.desktop.all} {
    width: 70%;
  }

  & > [class*='mui-col'] {
    display: flex;
    flex-direction: column;
    align-items: center;
    text-align: center;
    p { width: 80%; }

    & > .imgWrapper {
      width: 100%;
      height: 30vh;
      ${cssQuery.desktop.all} { height: 15vh; }
      ${cssQuery.desktop.short} { height: 19vh; }
      ${cssQuery.mobile.landscape.all} { height: 30vh; }
      ${cssQuery.mobile.wide} { height: 16vh; }
      box-sizing: border-box;

      display: flex;
      align-items: center;
      justify-content: center;
    }

    img {
      height: 55%;
      object-fit: contain;
    }

    /* Centers the weight of the first icon */
    :nth-child(1) {
      img {
        margin-left: 4%;
        ${cssQuery.mobile.all} {
          margin-left: 13%;
        }
      }
    }

    ${cssQuery.mobile.all} {
      img { height: 45%; }
      :nth-child(2) { img { height: 65%; } }
    }
  }
`

export const HowItWorks: React.FC = () => {
  return <Wrapper centerChildContent={true} columnChildContent={true}>
    <Container>
      <Headline>
        <h4>How does it works?</h4>
        <p>
          Sign up for Vote by Mail in <b>2 minutes</b> without leaving your screen. No printer, stamp, or envelope required.
        </p>
        <h5>Sign up before your state deadline</h5>
      </Headline>
      <EnterZip/>
      <Steps>
        <Col md={4} sm={12}>
          <div className="imgWrapper">
            <img src={iconPen} alt="Sign Up"/>
          </div>
          <h5>1. Sign up</h5>
          <p>Fill out your vote by mail signup information on our website</p>
        </Col>
        <Col md={4} sm={12}>
          <div className="imgWrapper">
            <img src={iconBallot} alt="Wait for your ballot"/>
          </div>
          <h5>2. Wait for your ballot</h5>
          <p>Relax. We immediately send you and your local election official your request</p>
        </Col>
        <Col md={4} sm={12}>
          <div className="imgWrapper">
            <img src={iconPlane} alt="Vote"/>
          </div>
          <h5>3. Vote</h5>
          <p>Fill out your ballot from the comfort of your own home and mail it back</p>
        </Col>
      </Steps>
    </Container>
  </Wrapper>
}
