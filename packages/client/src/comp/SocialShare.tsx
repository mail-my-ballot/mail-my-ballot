import React from 'react'
import styled from 'styled-components'

import { AboutButtonWrapper } from './About'
import { RoundedButton } from './util/Button'

const ButtonsWrapper = styled.div<{ fromSuccess?: boolean }>`
  display: flex;
  width: 100%;
  justify-content: ${(p) => p.fromSuccess ? 'space-around' : 'center'};
  flex-flow: row wrap;

  @media screen and (min-width: 1366px) {
    & a {
      width: ${(p) => p.fromSuccess ? '40%' : '100%'};
    }
    & a button {
      width: ${(p) => p.fromSuccess ? '100%' : '70%'}
    }
  }
`

export const ShareFacebook: React.FC = () => {
  const href = 'https://www.facebook.com/sharer/sharer.php?u=https%3A%2F%2Fmailmyballot.org%2F&amp;src=sdkpreparse'
  return <AboutButtonWrapper href={href} target="_blank" rel="noopener noreferrer">
    <RoundedButton color='primary'>
      <i className="fa fa-facebook"/>
      <span>Share on Facebook</span>
    </RoundedButton>
  </AboutButtonWrapper>
}

export const ShareTwitter: React.FC = () => {
  const refSrc = 'ref_src=twsrc%5Etfw'
  const text = encodeURI('text=Hey I\'ve just started voting from home! You can do it too! More details at https://mailmyballot.org')
  const via = 'via=mailmyballot'
  const related = 'related=mailmyballot'
  const hashtag = 'hashtag=mailmyballot,voteathome'
  const params = [refSrc, text, via, related, hashtag].join('&')

  return <AboutButtonWrapper
    href={`https://twitter.com/share?${params}`}
    target="_blank" rel="noopener noreferrer"
    id="twitter_share"
  >
    <RoundedButton color='primary'>
      <i className="fa fa-twitter"/>
      <span>Share on Twitter</span>
    </RoundedButton>
  </AboutButtonWrapper>
}

interface Props {
  /**
   * Changes the title of the SocialShare component when true to better
   * fit the context displayed at the Success screen.
   */
  fromSuccess?: boolean
}

export const SocialShare: React.FC<Props> = ({ fromSuccess }) => {
  return <>
    <h3>
      {fromSuccess ? 'Care to spare a few seconds?' : 'Help us spread the word'}
    </h3>
    <p>Your family and friends might not know how easy it is to start voting at home. Why not share this comfort with them?</p>
    <ButtonsWrapper fromSuccess={fromSuccess}>
      <ShareFacebook/>
      <ShareTwitter/>
    </ButtonsWrapper>
  </>
}
