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
  <a href='https://votebymail.io/'>VoteByMail.io</a>
  <VBar/>
  <Link to='/about'>About Us</Link>
  <VBar/>
  <a href='https://www.votebymail.io/site-terms/'>Privacy Policy</a>
  <VBar/>
  <a href='https://www.votebymail.io/site-terms/'>Terms of Service</a>

  {/*
    These are temporary social links, since the home page, including the
    Footer are subject to a redesign.
   */}
  <VBar/>
  <a href='https://www.facebook.com/Mail-My-Ballot-103074334722159/' rel='noopener noreferrer' target='_blank'>
    <i className='fa fa-facebook'/>
  </a>
  <VBar/>
  <a href='https://twitter.com/votebymail?ref_src=twsrc%5Etfw' rel='noopener noreferrer' target='_blank'>
    <i className='fa fa-twitter'/>
  </a>
  <VBar/>
  <a href='https://www.instagram.com/votebymail'>
    <i className='fa fa-instagram'/>
  </a>
</FooterWrapper>
