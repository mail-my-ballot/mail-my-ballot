import React from 'react'
import styled from 'styled-components'
import { Link } from 'react-router-dom'

const VBar = () => <span style={{margin: '0 0.5rem'}}>|</span>

const FooterWrapper  = styled.div`
  text-align: center;
  margin: 2rem 0;
  color: rgba(0,0,0,0.5);
  a {
    color: rgba(0,0,0,0.5);
  }
  font-size: 12px;
  line-height: 18px;
`

export const Footer = () => <FooterWrapper>
  <a href='https://mailmyballot.org/'>MailMyBallot.org</a>
  <VBar/>
  A <a href='https://www.voteathome.org'>Vote at Home</a> Project
  <VBar/>
  <Link to='/about'>About Us</Link>
  <VBar/>
  <a href='https://www.voteathome.org/site-terms/'>Privacy Policy</a>
  <VBar/>
  <a href='https://www.voteathome.org/site-terms/'>Terms of Service</a>
</FooterWrapper>
