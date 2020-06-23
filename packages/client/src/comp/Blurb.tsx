import React from 'react'
import styled from 'styled-components'
import { Container } from 'muicss/react'
import { cssQuery } from './util/cssQuery'

import img1k from './img/blurb_bg_max_width_1k.jpg'
import img2k from './img/blurb_bg_max_width_2k.jpg'
import img6k from './img/blurb_bg_max_width_6k.jpg'
import { EnterZip } from './util/EnterZip'
import { FullscreenWrapper } from './util/FullscreenWrapper'

const bgGradient = 'linear-gradient(to bottom right, #fffd, #fffa)'

const Wrapper = styled(FullscreenWrapper)`
  position: relative;
  z-index: 9;
  box-shadow: 0 0 14px #0003;

  /*
    Loads the background image according to the device's screen dimensions
    We use manual queries here since these are mostly based on the dimensions
    of the pictures used as background.
  */
  @media screen and (max-width: 640px) {
    background-image: ${bgGradient}, url(${img1k});
    background-size: cover;
    background-position-x: 64%;
    background-position-y: 0;
  }
  @media screen and (min-width: 641px) {
    background-image: ${bgGradient}, url(${img1k});
    background-size: cover;
    background-position-x: 44%;
    background-position-y: 0;
  }
  @media screen and (min-width: 1281px) {
    background-image: ${bgGradient}, url(${img2k});
    background-size: 115vw;
    background-position-x: 74%;
    background-position-y: 64%;
  }
  @media screen and (min-width: 1920px) {
    background-image: ${bgGradient}, url(${img6k});
    background-size: 100vw;
  }

  /* Device Adjustments */
  ${cssQuery.desktop.all} {
    h3 { width: 55%; }
  }
  ${cssQuery.mobile.landscape.all} {
    h3 { width: 70%; }
  }
`

export const Blurb: React.FC = () => {
  // We don't directly return a Container here since setting the BG feels
  // hacky (if we use Fluid Containers we'd need to tweak the max-width/padding
  // manually).
  return <Wrapper columnChildContent={true} centerChildContent={true}>
    <Container>
      <h3>
        MailMyBallot streamlines state vote-by-mail applications by digitizing the voter’s signup process.
      </h3>
      <h5 style={{ fontWeight: 'normal', margin: '2em 0' }}>
        Enter your ZIP Code to get started
      </h5>
      <EnterZip/>
    </Container>
  </Wrapper>
}
