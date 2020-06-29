import React, { useRef } from 'react'
import { toast } from 'react-toastify'
import styled from 'styled-components'

import { useAppHistory } from '../lib/path'
import { Button } from 'muicss/react'
import { cssQuery } from './util/cssQuery'
import { InputButton } from './util/InputButton'

const link = (oid: string) => `https://mailmyballot.org/#/org/${oid}/`

// Because useAppHistory can only be used within Functional Components we
// will need to manually acquire and pass `oid` on each component using
// `shareText`
const shareText = (oid: string) => {
  return `I just signed up to Vote by Mail.  You can signup too in under 2 minutes at ${link(oid)}.  No printer, envelope, or stamp needed.`
}

export const SocialButtonWrapper = styled.a`
  display: flex;
  width: 33%;
  justify-content: center;

  & button {
    width: 95%;
    padding: 0;
    border-radius: 4px;
    height: 3.1em;
    display: flex;
    ${cssQuery.desktop.all} {
      width: 90%;
    }
  }

  /* Ensures Icons & Labels are alligned */
  & button > i,
  & button > span {
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    box-sizing: border-box;
  }
  & button > span { flex: 2; font-weight: bold; }

  /* Icon effects */
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
  return <SocialButtonWrapper>
    <Button
      onClick={() => openInNewWindow(href)}
      color='primary'
      style={{backgroundColor: '#3b5998'}}
    >
      <i className="fa fa-facebook"/>
      <span>Share</span>
    </Button>
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

  return <SocialButtonWrapper>
    <Button
      onClick={() => openInNewWindow(href)}
      color='primary'
      style={{backgroundColor: '#00acee'}}
    >
      <i className="fa fa-twitter"/>
      <span>Share</span>
    </Button>
  </SocialButtonWrapper>
}

const ShareLinkButton = styled(InputButton)`
  --inputButton__width: 90%;
  margin: 0.3em 0;
  margin-left: 5%;
  ${cssQuery.desktop.all} {
    --inputButton__width: 70%;
    margin-left: 15%;
  }
  box-shadow: none;

  button {
    flex: 1;
  }
`

/** Copies the site URL to the clipboard, notifies the user about this event */
export const ShareLink: React.FC = () => {
  const inputEl = useRef<HTMLInputElement>(null)
  const { oid } = useAppHistory()
  const url = link(oid)

  const onClick = () => {
    inputEl?.current?.select()
    document.execCommand('copy')
    toast(
      'Link copied to clipboard',
      {
        type: 'info',
      }
    )
  }

  return <ShareLinkButton
    value={url}
    buttonLabel="Copy"
    ref={inputEl}
    onSubmit={(e) => {
      e.preventDefault()
      onClick()
    }}
    onClick={onClick}
  />
}

/**
 * Launches users' email client in order to send a pre-defined email message.
 */
export const ShareEmail: React.FC = () => {
  const { oid } = useAppHistory()
  // These are not yet editable in our app, however the user can freely
  // edit the content of the message.
  const title = 'Sign up to Vote by Mail in 2 minutes on MailMyBallot.org'
  const body =
`Hello,

${shareText(oid)}`
  const href = `mailto:?subject=${title}&body=${body}`

  return <SocialButtonWrapper>
    <Button
      color='primary'
      onClick={() => openInNewWindow(href)}
    >
      <i className="fa fa-envelope-o"/>
      <span>Share</span>
    </Button>
  </SocialButtonWrapper>
}

export const SocialShare: React.FC = () => {
  return <>
    <ShareLink/>
    <ShareFacebook/>
    <ShareTwitter/>
    <ShareEmail/>
  </>
}
