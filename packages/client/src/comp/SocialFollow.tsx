import React from 'react'
import { AboutButtonWrapper } from './About'
import { RoundedButton } from './util/Button'

const FollowTwitter: React.FC = () => {
  return <AboutButtonWrapper
    title="Follow @MailMyBallot on Twitter"
    href="https://twitter.com/intent/follow?screen_name=mailmyballot"
    target="_blank" rel="noopener noreferrer"
  >
    <RoundedButton color='primary'>
      <i className="fa fa-twitter" style={{ paddingRight: 10 }}/>
      Follow us on Twitter
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
      <i className="fa fa-instagram" style={{ paddingRight: 10 }}/>
      Follow us on Twitter
    </RoundedButton>
  </AboutButtonWrapper>
}

export const SocialFollow: React.FC = () => {
  return <>
    <h1>We&apos;re social!</h1>
    <p>
      Stay in touch with us by following us on your favorite social networks.
    </p>
    <FollowTwitter/>
    <FollowInstagram/>
  </>
}
