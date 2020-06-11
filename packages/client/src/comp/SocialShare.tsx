import React from 'react'
import styled from 'styled-components'

import { RoundedButton } from './util/Button'

const ButtonsWrapper = styled.div<{ fromSuccess?: boolean }>`
  display: flex;
  width: 100%;
  justify-content: ${(p) => p.fromSuccess ? 'space-around' : 'center'};
  flex-flow: row wrap;

  /*
    We don't use AboutButtonWrapper here as SocialShare can also be shown
    on the Success page.
  */
  & a {
    width: ${(p) => p.fromSuccess ? 'initial' : '100%'};
    display: flex;
    justify-content: center;
  }
  & a button {
    width: ${(p) => p.fromSuccess ? 'initial' : '90%'}
  }
  & i {
    padding-right: 10px;
  }

  @media screen and (min-width: 1600px) {
    width: ${(p) => p.fromSuccess ? '70%' : '100%'};
    margin-left: ${(p) => p.fromSuccess ? '15%' : '0'};
    & a button {
      width: ${(p) => p.fromSuccess ? 'initial' : '70%'}
    }
  }
`

export const ShareFacebook: React.FC = () => {
  const href = 'https://www.facebook.com/sharer/sharer.php?u=https%3A%2F%2Fmailmyballot.org%2F&amp;src=sdkpreparse'
  return <a href={href} target="_blank" rel="noopener noreferrer">
    <RoundedButton color='primary'>
      <i className="fa fa-facebook"/>
      Share on Facebook
    </RoundedButton>
  </a>
}

export const ShareTwitter: React.FC = () => {
  const refSrc = 'ref_src=twsrc%5Etfw'
  const text = encodeURI('text=Hey I\'ve just started voting from home! You can do it too! More details at https://mailmyballot.org')
  const via = 'via=mailmyballot'
  const related = 'related=mailmyballot'
  const hashtag = 'hashtag=mailmyballot,voteathome'
  const params = [refSrc, text, via, related, hashtag].join('&')

  return <a
    href={`https://twitter.com/share?${params}`}
    target="_blank" rel="noopener noreferrer"
    id="twitter_share"
  >
    <RoundedButton color='primary'>
      <i className="fa fa-twitter"/>
      Share on Twitter
    </RoundedButton>
  </a>
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
