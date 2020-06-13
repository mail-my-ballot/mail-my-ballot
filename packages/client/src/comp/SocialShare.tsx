import React from 'react'
import { toast } from 'react-toastify'
import styled from 'styled-components'

import { RoundedButton } from './util/Button'
import { useAppHistory } from '../lib/path'

const link = (oid: string) => `https://mailmyballot.org/#/org/${oid}/`

// Because useAppHistory can only be used within Functional Components we
// will need to manually acquire and pass `oid` on each component using
// `shareText`
const shareText = (oid: string) => {
  return `I just signed up to Vote by Mail.  You can signup too in under 2 minutes at ${link(oid)}.  No printer, envelope, or stamp needed.`
}

export const SocialButtonWrapper = styled.a`
  display: flex;
  width: 100%;
  justify-content: center;

  & button { width: 60%; padding: 0; }
  @media screen and (min-width: 768px) {
    & button { width: 35%; }

    /* Normalizes the button width when displayed inside columns */
    [class*="mui-col"] & button {
      width: 60%;
    }
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
  & button > span { flex: 3; }
  & button > i {
    flex: 1;
    background-color: #0001;
    box-shadow: inset -3px 0 4px #0004;
    transition: background-color ease .5s;
  }
  & button:hover > i {
    background-color: #0003;
  }

  /*
  Removes undesired underlines set by MuiCSS (hard to see them because they
  are of a shade of blue very close to the button's color).
  */
  &:hover { text-decoration: none }
`

/**
 * Opens the given link in a new window. The window dimensions can be customized.
 *
 * URLs passed to this function are automatically encoded.
 */
export const openInNewWindow = (href: string, width = 720, height = 600) => {
  window.open(encodeURI(href), '', `width=${width},height=${height}`)
}

/** Opens a new window to share about MailMyBallot */
export const ShareFacebook: React.FC = () => {
  const { oid } = useAppHistory()
  const href = `https://www.facebook.com/sharer/sharer.php?u=${link(oid)}&amp;src=sdkpreparse`
  return <SocialButtonWrapper onClick={() => openInNewWindow(href)}>
    <RoundedButton color='primary'>
      <i className="fa fa-facebook"/>
      <span>Share</span>
    </RoundedButton>
  </SocialButtonWrapper>
}

/** Opens a a new window with a pre-defined message to tweet about MailMyBallot */
export const ShareTwitter: React.FC = () => {
  const { oid } = useAppHistory()
  const refSrc = 'ref_src=twsrc%5Etfw'
  const text = `text=${shareText(oid)}`
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

const CopyLinkWrapper = styled(SocialButtonWrapper)`
  & button {
    width: 90%;
  }
  @media screen and (min-width: 768px) {
    & button {
      width: 50%;
    }
    [class*="mui-col"] & button {
      width: 90%;
    }
  }
  & button > i {
    flex: 3;
    font-style: normal;
  }
  & button > span {
    flex: 1;
  }
`

/** Copies the site URL to the clipboard, notifies the user about this event */
export const ShareLink: React.FC = () => {
  const { oid } = useAppHistory()
  const onClick = () => {
    const textField = document.createElement('textarea')
    textField.innerText = link(oid)
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

  return <CopyLinkWrapper onClick={onClick}>
    <RoundedButton color='primary'>
      <i>mailmyballot.org</i>
      <span>Copy</span>
    </RoundedButton>
  </CopyLinkWrapper>
}

/**
 * Launches users' email client in order to send a pre-defined email message.
 */
export const ShareEmail: React.FC = () => {
  const { oid } = useAppHistory()
  // These are not yet editable in our app, however the user can freely
  // edit the content of the message.
  const title = 'Hey, I\'ve started to vote at home.'
  const body =
`Hello,

${shareText(oid)}`
  const href = `mailto:?subject=${title}&body=${body}`

  return <SocialButtonWrapper onClick={() => openInNewWindow(href)}>
    <RoundedButton color='primary'>
      <i className="fa fa-envelope-o"/>
      <span>Share</span>
    </RoundedButton>
  </SocialButtonWrapper>
}

export const SocialShare: React.FC = () => {
  return <>
    <ShareLink/>
    <ShareTwitter/>
    <ShareEmail/>
    <ShareFacebook/>
  </>
}
