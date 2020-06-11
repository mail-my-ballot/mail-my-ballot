import React, { useState } from 'react'
import { toast } from 'react-toastify'
import styled, { css, keyframes } from 'styled-components'

import { RoundedButton } from './util/Button'
import { Input } from 'muicss/react'

export const AboutButtonWrapper = styled.a`
  display: flex;
  width: 100%;
  justify-content: center;

  & button { width: 90%; }
  @media screen and (min-width: 1366px) {
    & button { width: 70%; }
  }

  /* Ensures Icons & Labels are alligned */
  & button { display: flex; }
  & button > i,
  & button > span {
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
  }
  & button > i { flex: 1; }
  & button > span { flex: 9; }
`

const ButtonsWrapper = styled.div<{ fromSuccess?: boolean }>`
  display: flex;
  width: 100%;
  justify-content: ${(p) => p.fromSuccess ? 'space-around' : 'center'};
  flex-flow: row wrap;

  @media screen and (min-width: 1366px) {
    & a, & #shareByEmail {
      width: ${(p) => p.fromSuccess ? '40%' : '100%'};
    }
    & a > button, & #shareByEmail > button {
      width: ${(p) => p.fromSuccess ? '100%' : '70%'}
    }
  }
`

/** Opens a new tab to share about MailMyBallot */
export const ShareFacebook: React.FC = () => {
  const href = 'https://www.facebook.com/sharer/sharer.php?u=https%3A%2F%2Fmailmyballot.org%2F&amp;src=sdkpreparse'
  return <AboutButtonWrapper href={href} target="_blank" rel="noopener noreferrer">
    <RoundedButton color='primary'>
      <i className="fa fa-facebook"/>
      <span>Share on Facebook</span>
    </RoundedButton>
  </AboutButtonWrapper>
}

/** Opens a a new tab with a pre-defined message to tweet about MailMyBallot */
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

/** Copies the site URL to the clipboard, notifies the user about this event */
export const ShareLink: React.FC = () => {
  const onClick = () => {
    const textField = document.createElement('textarea')
    textField.innerText = 'https://mailmyballot.org'
    document.body.appendChild(textField)
    textField.select()
    document.execCommand('copy')
    textField.remove()
    toast(
      <div style={{ padding: 20 }}>
        Link copied to clipboard
      </div>,
      {
        type: 'info',
      }
    )
  }

  return <AboutButtonWrapper onClick={onClick}>
    <RoundedButton color='primary'>
      <i className="fa fa-link"/>
      <span>Share by link</span>
    </RoundedButton>
  </AboutButtonWrapper>
}

const EmailButtonWrapper = styled(AboutButtonWrapper).attrs({ as: 'div' })`
  position: relative;

  & > button {
    /* position: relative; */
    overflow: visible;
  }
`

const fadeIn = keyframes`
  from { opacity: 0; }
  to { opacity: 1 }
`
const fadeOut = keyframes`
  from { opacity: 1 }
  to { opacity: 0; }
`
const grow = keyframes`
  from { height: 0 }
  to { height: 470% }
`
const shrink = keyframes`
  from { height: 470% }
  to { height: 0 }
`

type emailVisibility = '' | 'visible' | 'hiding'
const EmailFields = styled.div<{ visibility: emailVisibility }>`
  width: 100%;
  height: 470%;
  position: absolute;
  bottom: 0; right: 0;

  background-color: white;
  border-radius: 4px;
  box-shadow: 0 0 4px #0005;

  display: ${p => p.visibility === '' ? 'none' : 'flex'};
  flex-direction: row;
  flex-flow: row wrap;
  align-items: flex-end;
  justify-content: center;
  animation: ${
    p => p.visibility === 'visible'
      ? css`${grow} ease .25s both`
      : css`${shrink} ease .25s both, ${fadeOut} ease .25s both`
  };

  & > .mui-textfield, & > span, & > a {
    width: 90%;
    height: 25%;
    margin: 0;
    box-sizing: border-box;
    z-index: 9;

    display: flex;
    align-items: center;
    justify-content: center;

    animation: ${
      p => p.visibility === 'visible'
        ? css`${fadeIn} ease .3s both`
        : '' // There's already a exit animation on the parent
    }
  }

  & > .mui-textfield > label {
    overflow: hidden;
  }


  & > span, & > a {
    width: 50%;
    height: 30%;

    border: none;
    background: none;
  }
  & > span:hover, & > a:hover {
    text-decoration: none;
    background-color: #00000008;
  }
  & > span > i, & > a > i {
    padding-right: 8px;
  }

  & > span { color: #607D8B; }
`

/**
 * Allows users to set a destination + name and launches their email
 * client in order to send a pre-defined email message.
 */
export const ShareEmail: React.FC = () => {
  // Will pop a small context menu which allows users to set the details
  // about the email destination
  //
  // We don't use a boolean here in order to allow smooth hiding animations
  const [ visibility, setVisibility ] = useState<emailVisibility>('')

  // Let the user set who will receive the email
  const [ name, setName ] = useState('')
  const [ email, setEmail ] = useState('')

  // These are not yet editable in our app, however the user can freely
  // edit the content of the message.
  const title = `Hey ${name}, I've started to vote at home.`
  const body = encodeURI(
`Hello ${name},

I'm sending you this email because I've just discovered how easy it is to vote at home, you can do it too! Visit https://mailmyballot.com to know more.`
  )

  // Create a context menu which can hide/show itself when the user is
  // interacting with ShareEmail
  //
  // The fromButton prevents any click within the menu to hide the context
  // menu.
  const toggleVisibility = (fromButton: boolean) => {
    if (visibility === 'visible' && fromButton) {
      setVisibility('hiding')
      setTimeout(
        () => setVisibility(''),
        // Should be a bit more than the animation-duration
        300,
      )
    } else if (visibility === '') {
      setVisibility('visible')
    }
  }

  const onChangeField = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name } = e.currentTarget.dataset
    if (name) {
      setName(e.currentTarget.value)
    } else {
      setEmail(e.currentTarget.value)
    }
  }

  return <EmailButtonWrapper id="shareByEmail">
    <RoundedButton color='primary' onClick={() => toggleVisibility(false)}>
      <i className="fa fa-envelope-o"/>
      <span>Share by Email</span>
      <EmailFields visibility={visibility}>
        <Input
          type="text"
          onChange={onChangeField}
          data-name="true"
          value={name}
          floatingLabel={true} label="Name"
        />
        <Input
          type="text"
          onChange={onChangeField}
          value={email}
          floatingLabel={true} label="Email"
        />
        <span onClick={() => toggleVisibility(true)}>
          <i className="fa fa-close"/>
          <span>Cancel</span>
        </span>
        <a
          href={`mailto:${email}?subject=${title}&body=${body}`}
          target="_blank" rel="noopener noreferrer"
        >
          <i className="fa fa-paper-plane-o"/>
          <span>Send</span>
        </a>
      </EmailFields>
    </RoundedButton>
  </EmailButtonWrapper>
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
      <ShareLink/>
      <ShareEmail/>
    </ButtonsWrapper>
  </>
}
