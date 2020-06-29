import React from 'react'
import styled from 'styled-components'

import img1 from './img/about_pic1.jpg'
import img2 from './img/about_pic2.jpeg'
import { cssQuery } from './util/cssQuery'
import { SocialFollow } from './SocialFollow'
import { SocialShare } from './SocialShare'
import { FullscreenWrapper } from './util/FullscreenWrapper'
import { Container } from 'muicss/react'

const Wrapper = styled(FullscreenWrapper)`
  background-color: #fafafa;
  box-shadow: 0 12px 14px -10px rgba(0, 0, 0, 0.25) inset;

  .mui-contaier {
    flex-flow: row wrap;
  }

  ${cssQuery.desktop.all} {
    .mui-container {
      flex-direction: row-reverse;
      align-items: center;
      flex-flow: row-reverse wrap;
    }
  }
`

const Headline = styled.div`
  width: 90%;
  text-align: left;
  h1 { padding-top: 1em; }
  ${cssQuery.mobile.narrow} { h1 { padding-top: 0; } }

  ${cssQuery.mobile.narrow} { text-align: center; }
  ${cssQuery.desktop.all} { width: 40%; p { width: 80%; } }
  ${cssQuery.mobile.wide} { width: 50%; }
`

// The images use vh as its sizing factor to ensure all devices can get the
// same overlapped effect.
const Images = styled.div`
  position: relative;
  width: 100%;
  height: 90vh;
  ${cssQuery.mobile.landscape.all} { height: 180vh; }
  margin: 8vh 0;

  ${cssQuery.desktop.all} {
    width: 40%;
    ${cssQuery.desktop.wide} { width: 35%; }
    height: 80vh;
    ${cssQuery.desktop.tall} { height: 60vh; }
    margin: 0;
  }

  img {
    width: 85%;
    height: 47vh;
    ${cssQuery.desktop.short} { height: 42vh; }
    ${cssQuery.desktop.tall} { height: 31vh; }
    ${cssQuery.mobile.landscape.all} { height: 93vh; }

    object-fit: cover;
    position: absolute;

    box-shadow: 0 0 6px rgba(0, 0, 0, 0.35);

    &:nth-child(1) {
      bottom: 0;
      right: 0;
    }
    &:nth-child(2) {
      top: 0;
      left: 0;
    }
  }
`

const Social = styled.div`
  width: 100%;
  display: flex;
  flex-flow: row wrap;
  box-sizing: border-box;
  padding: 0 30%;
  ${cssQuery.mobile.narrow} { padding: 0; }
  h5 {
    /* So it is not wrapped */
    width: 100%;
    text-align: center;
  }
`

export const About: React.FC = () => {
  return <Wrapper columnChildContent={true} centerChildContent={true}>
    <Container>
      <Images>
        <img src={img2} alt="Voters"/>
        <img src={img1} alt="Election Stickers"/>
      </Images>
      <Headline>
        <h1>
          About us
        </h1>
        <p>
          COVID-19 has catalyzed interest in Vote by Mail. MailMyBallot streamlines government vote-by-mail applications by digitizing the voter&apos;s signup process. MailMyBallot drives voter turnout in key swing states by helping organizes sign up voters to be able to vote-by-mail.
        </p>
        <p>
          <a href="https://mailmyballot.org" target="_blank" rel="noopener noreferrer">MailMyBallot</a> is a <a href="https://www.voteathome.org" target="_blank" rel="noopener noreferrer">Vote at Home</a> project. We are a non-partisan non-profit {/* Organization? */} that empowers voters, letting them decide when, how and where they vote.
        </p>
      </Headline>
      <Social>
        <h5>Share</h5>
        <SocialShare/>
        <h5>Follow</h5>
        <SocialFollow/>
      </Social>
    </Container>
  </Wrapper>
}
