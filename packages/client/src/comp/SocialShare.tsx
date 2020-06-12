import React from 'react'
import { toast } from 'react-toastify'
import styled from 'styled-components'

import { RoundedButton } from './util/Button'
import { useAppHistory } from '../lib/path'

const shareText = 'I just signed up to Vote by Mail.  You can signup too in under 2 minutes at https://mailmyballot.org.  No printer, envelope, or stamp needed.'

export const SocialButtonWrapper = styled.a`
  display: flex;
  width: 100%;
  justify-content: center;

  & button { width: 60%; }
  @media screen and (min-width: 1366px) {
    & button { width: 40%; }
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

/**
 * Opens the given link in a new window. The window dimensions can be customized.
 */
export const openInNewWindow = (href: string, width = 720, height = 600) => {
  window.open(href, '', `width=${width},height=${height}`)
}

/** Opens a new window to share about MailMyBallot */
export const ShareFacebook: React.FC = () => {
  const href = 'https://www.facebook.com/sharer/sharer.php?u=https%3A%2F%2Fmailmyballot.org%2F&amp;src=sdkpreparse'
  return <SocialButtonWrapper onClick={() => openInNewWindow(href)}>
    <RoundedButton color='primary'>
      <i className="fa fa-facebook"/>
      <span>Share</span>
    </RoundedButton>
  </SocialButtonWrapper>
}

/** Opens a a new window with a pre-defined message to tweet about MailMyBallot */
export const ShareTwitter: React.FC = () => {
  const refSrc = 'ref_src=twsrc%5Etfw'
  const text = encodeURI(`text=${shareText}`)
  const via = 'via=mailmyballot'
  const related = 'related=mailmyballot'
  const hashtag = 'hashtag=mailmyballot,voteathome'
  const params = [refSrc, text, via, related, hashtag].join('&')
  const href = `https://twitter.com/share?${params}`

  return <SocialButtonWrapper onClick={() => openInNewWindow(href)}>
    <RoundedButton color='primary'>
      <i className="fa fa-twitter"/>
      <span>Share</span>
    </RoundedButton>
  </SocialButtonWrapper>
}

/** Copies the site URL to the clipboard, notifies the user about this event */
export const ShareLink: React.FC = () => {
  const { oid } = useAppHistory()

  const onClick = () => {
    const textField = document.createElement('textarea')
    textField.innerText = `https://mailmyballot.org/#/org/${oid}`
    document.body.appendChild(textField)
    textField.select()
    document.execCommand('copy')
    textField.remove()

    toast(
      'Link copied to clipboard',
      {
        type: 'info',
      }
    )
  }

  return <SocialButtonWrapper onClick={onClick}>
    <RoundedButton color='primary'>
      <i className="fa fa-link"/>
      <span>Share</span>
    </RoundedButton>
  </SocialButtonWrapper>
}

/**
 * Launches users' email client in order to send a pre-defined email message.
 */
export const ShareEmail: React.FC = () => {
  // These are not yet editable in our app, however the user can freely
  // edit the content of the message.
  const title = 'Hey, I\'ve started to vote at home.'
  const body = encodeURI(
`Hello,

${shareText}`
  )
  const href = `mailto:?subject=${title}&body=${body}`

  return <SocialButtonWrapper onClick={() => openInNewWindow(href)}>
    <RoundedButton color='primary'>
      <i className="fa fa-envelope-o"/>
      <span>Share</span>
    </RoundedButton>
  </SocialButtonWrapper>
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
    <ShareTwitter/>
    <ShareFacebook/>
    {!fromSuccess && <ShareLink/>}
    <ShareEmail/>
  </>
}
