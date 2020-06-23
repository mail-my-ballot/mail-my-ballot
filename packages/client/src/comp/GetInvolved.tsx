import React from 'react'
import styled from 'styled-components'

import bgImage from './img/get_involved_bg.jpeg'
import iconBadge from './img/gi_icon_badge.svg'
import iconGear from './img/gi_icon_gear.svg'
import { useAppHistory } from '../lib/path'
import { cssQuery } from './util/cssQuery'
import { FullscreenWrapper } from './util/FullscreenWrapper'
import { Container } from 'muicss/react'
import { UnderlineAnchor } from './util/UnderlineAnchor'

const bgGradient = 'linear-gradient(to left, rgba(0, 89, 186, 0.9), rgba(0, 89, 186, 0.9))'

const Wrapper = styled(FullscreenWrapper)`
  background: ${bgGradient}, url(${bgImage});
  background-size: cover;
`

const CardWrapper = styled.div`
  width: 100%;
  padding: 0;
  margin: 0;
  display: flex;
  flex-flow: row wrap;
  justify-content: center;
`

const desktopAndTabletFix = `
  width: 38%;
  height: 18.8em;
  margin: 0;
  :nth-child(1) {
    margin-right: 2em;
  }
`

const Card = styled.div`
  background-color: white;
  height: 23em;
  width: 90%;
  margin: 1em 0;
  padding: 2em;
  box-sizing: border-box;

  ${cssQuery.mobile.wide} {
    ${desktopAndTabletFix}
    width: 46%;
    height: 22em;
  }

  ${cssQuery.mobile.landscape.all} { height: 17.5em; }

  ${cssQuery.desktop.all} { ${desktopAndTabletFix} }
  ${cssQuery.desktop.tall} { height: 19em; }
  ${cssQuery.desktop.narrow} { width: 45%; height: 20em; }

  img {
    height: 25%;
  }

  p a {
    text-decoration: underline;
    color: #323232;
  }

  b { color: #db002f; }
  em { font-family: 'Merriweather', serif; }

  /* Send "Contact US" to the bottom */
  position: relative;
  & > a {
    position: absolute;
    bottom: 1.5em;
  }
`

export const GetInvolved: React.FC = () => {
  const { pushStartSection } = useAppHistory()

  return <Wrapper>
    <Container>
      <CardWrapper>
        <Card>
          <div className="imgWrapper">
            <img src={iconBadge} alt="Election Official"/>
          </div>
          <h5>I am an <em>election <b>official</b></em></h5>
          <p>
            We collaborate closely with election officials to help streamline their workflows.
            {' '}
            <a href='https://docs.google.com/document/d/1JK57T7QcBcF3-uaSo0bNbGahdRD6qpkvgtOh-4FFYfs/edit#bookmark=kix.97i44inhfzdp' rel='noopener noreferrer' target='_blank'>
              More Info...
            </a>
          </p>
          <UnderlineAnchor href="#contact" onClick={() => pushStartSection('contact')}>
            Contact us
          </UnderlineAnchor>
        </Card>
        <Card>
          <div className="imgWrapper">
            <img src={iconGear} alt="Election Organizer"/>
          </div>
          <h5>I am a <em>civic <b>organizer</b></em></h5>
          <p>
            We provide 100% free tools for organizers to mobilize voters to track signups through our platform.
            {'  '}
            <a href='https://docs.google.com/document/d/1DHkjoFGPOXx9RaHYWgZ0Z2CJtF3_Fs5NwiA2z_Joz-Y/edit#heading=h.wz7ldwdgecc0' rel='noopener noreferrer' target='_blank'>
              More Info...
            </a>
          </p>
          <UnderlineAnchor href="#contact" onClick={() => pushStartSection('contact')}>
            Contact us
          </UnderlineAnchor>
        </Card>
      </CardWrapper>
    </Container>
  </Wrapper>
}
