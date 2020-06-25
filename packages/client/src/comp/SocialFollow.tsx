import React from 'react'
import { SocialButtonWrapper, openInNewWindow } from './SocialShare'
import { Button } from 'muicss/react'

const FollowTwitter: React.FC = () => {
  const href = 'https://twitter.com/intent/follow?screen_name=mailmyballot'
  return <SocialButtonWrapper title="Follow @MailMyBallot on Twitter">
    <Button
      onClick={() => openInNewWindow(href)}
      color='primary'
      style={{backgroundColor: '#00acee'}}
    >
      <i className="fa fa-twitter"/>
      <span>Follow</span>
    </Button>
  </SocialButtonWrapper>
}

const FollowInstagram: React.FC = () => {
  const href = 'https://www.instagram.com/mailmyballot'

  return <SocialButtonWrapper title="Follow @MailMyBallot on Instagram">
    <Button
      onClick={() => openInNewWindow(href)}
      style={{
        backgroundImage: 'linear-gradient(45deg, #f09433 0%,#e6683c 25%,#dc2743 50%,#cc2366 75%,#bc1888 100%)',
        color: 'white',
        filter: 'brightness(1.1)',
      }}
    >
      <i className="fa fa-instagram"/>
      <span>Follow</span>
    </Button>
  </SocialButtonWrapper>
}

const FollowFacebook: React.FC = () => {
  const href = 'https://www.facebook.com/Mail-My-Ballot-103074334722159/'
  return <SocialButtonWrapper title="Follow @MailMyBallot on Facebook">
    <Button
      onClick={() => openInNewWindow(href, 1024)}
      color='primary'
      style={{backgroundColor: '#3b5998'}}
    >
      <i className="fa fa-facebook"/>
      <span>Follow</span>
    </Button>
  </SocialButtonWrapper>
}

export const SocialFollow: React.FC = () => {
  return <>
    <FollowFacebook/>
    <FollowTwitter/>
    <FollowInstagram/>
  </>
}
