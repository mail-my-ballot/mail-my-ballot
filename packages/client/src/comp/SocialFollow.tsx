import React from 'react'
import { AboutButtonWrapper } from './SocialShare'
import { RoundedButton } from './util/Button'

const FollowTwitter: React.FC = () => {
  return <AboutButtonWrapper
    title="Follow @MailMyBallot on Twitter"
    href="https://twitter.com/intent/follow?screen_name=mailmyballot"
    target="_blank" rel="noopener noreferrer"
  >
    <RoundedButton color='primary'>
      <i className="fa fa-twitter"/>
      <span>Follow us on Twitter</span>
    </RoundedButton>
  </AboutButtonWrapper>
}

const FollowInstagram: React.FC = () => {
  return <AboutButtonWrapper
    title="Follow @MailMyBallot on Instagram"
    href="https://www.instagram.com/mailmyballot"
    target="_blank" rel="noopener noreferrer"
  >
    <RoundedButton color='primary'>
      <i className="fa fa-instagram"/>
      <span>Follow us on Instagram</span>
    </RoundedButton>
  </AboutButtonWrapper>
}

const FollowFacebook: React.FC = () => {
  return <AboutButtonWrapper
    title="Follow @MailMyBallot on Facebook"
    href="https://www.facebook.com/Mail-My-Ballot-103074334722159/"
    target="_blank" rel="noopener noreferrer"
  >
    <RoundedButton color='primary'>
      <i className="fa fa-facebook"/>
      <span>Follow us on Facebook</span>
    </RoundedButton>
  </AboutButtonWrapper>
}

export const SocialFollow: React.FC = () => {
  return <>
    <h1>We&apos;re social!</h1>
    <p>
      Stay in touch by following us on your favorite social networks.
    </p>
    <FollowFacebook/>
    <FollowTwitter/>
    <FollowInstagram/>
  </>
}
