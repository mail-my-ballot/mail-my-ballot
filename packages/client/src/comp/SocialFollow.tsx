import React from 'react'
import { SocialButtonWrapper } from './SocialShare'
import { RoundedButton } from './util/Button'

const FollowTwitter: React.FC = () => {
  return <SocialButtonWrapper
    title="Follow @MailMyBallot on Twitter"
    href="https://twitter.com/intent/follow?screen_name=mailmyballot"
    target="_blank" rel="noopener noreferrer"
  >
    <RoundedButton color='primary'>
      <i className="fa fa-twitter"/>
      <span>Follow on Twitter</span>
    </RoundedButton>
  </SocialButtonWrapper>
}

const FollowInstagram: React.FC = () => {
  return <SocialButtonWrapper
    title="Follow @MailMyBallot on Instagram"
    href="https://www.instagram.com/mailmyballot"
    target="_blank" rel="noopener noreferrer"
  >
    <RoundedButton color='primary'>
      <i className="fa fa-instagram"/>
      <span>Follow on Instagram</span>
    </RoundedButton>
  </SocialButtonWrapper>
}

const FollowFacebook: React.FC = () => {
  return <SocialButtonWrapper
    title="Follow @MailMyBallot on Facebook"
    href="https://www.facebook.com/Mail-My-Ballot-103074334722159/"
    target="_blank" rel="noopener noreferrer"
  >
    <RoundedButton color='primary'>
      <i className="fa fa-facebook"/>
      <span>Follow on Facebook</span>
    </RoundedButton>
  </SocialButtonWrapper>
}

export const SocialFollow: React.FC = () => {
  return <>
    <FollowFacebook/>
    <FollowTwitter/>
    <FollowInstagram/>
  </>
}
