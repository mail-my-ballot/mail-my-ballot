import React from 'react'
import styled from 'styled-components'
import { Status, Statuses } from '../../common'

const Title = styled.h1`
  padding-top: 50px;
  @media only screen and (max-width: 414px) {
    padding-top: 0px;
    font-size: 55px;
    margin-top: 50px;
  }
`

const Text = styled.p`
  margin-bottom: 16px;
  @media only screen and (max-width: 414px) {
    font-size: 28px;
    padding-right: 60px;
    padding-left: 60px;
  }
`

interface StateField {
  state: string
  zip?: string
}
type StatusProps<T extends Status> = React.PropsWithChildren<T & StateField>

export const Automatic = ({state}: StatusProps<Statuses.Automatic>) => (<>
  <Title data-testid='status-title'>Great News!</Title>
  <Text data-testid='status-detail'>
  {state} automatically enrolls all registered voters to vote by mail.
    For more information, visit your state election website.
  </Text>
</>)

export const Website = ({state, regUrl, infoUrl}: StatusProps<Statuses.Website>) => (<>
  <Title data-testid='status-title'>Great News!</Title>
  <Text data-testid='status-detail'>
    {state} allows all registered voters to vote by mail.
    You can apply on the <a href={regUrl}>official state election application page</a>.
    For more information, visit your <a href={infoUrl}>state election website</a>.
  </Text>
</>)

export const Mail = ({state, infoUrl}: StatusProps<Statuses.Mail>) => (<>
  <Title data-testid='status-title'>Great News!</Title>
  <Text data-testid='status-detail'>
    {state} allows all registered voters to vote by mail.
    However, the state requires mailing a physical application, which we cannot support.
    For more information, visit your <a href={infoUrl}>state election website</a>.
  </Text>
</>)

export const VbmApp = ({state, children}: StatusProps<Statuses.VbmApp>) => (<>
  <Title data-testid='status-title'>Great News!</Title>
  <Text data-testid='status-detail'>
    {state} allows all registered voters to vote by mail and we can help you enroll.
  </Text>
  { children }
</>)

interface UseScriptArgs {
  id: string
  src?: string
  script?: string
  async?: boolean
  onLoad?: () => void
}

const useIframeResize = () => {
  const addScript = ({src, script, onLoad, async}: UseScriptArgs) => {
    const scriptTag = document.createElement('script')
  
    if (script) scriptTag.innerText = script
    if (src) scriptTag.src = src
    if (onLoad) scriptTag.onload = onLoad
    if (async) scriptTag.async = async
    document.body.appendChild(scriptTag)
  }

  React.useEffect(() => {
    addScript({
      id: 'script1',
      src: '//cdnjs.cloudflare.com/ajax/libs/iframe-resizer/3.5.3/iframeResizer.min.js',
      onLoad: () => addScript({
        id: 'script2',
        script: 'iFrameResize({ log:true, checkOrigin:false})',
      })
    })
  })
}

export const VoteDotOrg = ({state, zip}: StatusProps<Statuses.VoteDotOrg>) => {
  useIframeResize()

  const partnerId = 829218

  // Grabbed from here https://www.vote.org/technology/
  return <>
    <Title data-testid='status-title'>Great News!</Title>
    <Text data-testid='status-detail'>
      You can sign up below through our friends at <a href='https://vote.org'>Vote.org</a>
    </Text>
    <iframe
      style={{marginTop: '2em'}}
      src={`https://absentee.vote.org/?partner=${partnerId}&state=${state}&campaign=free-tools&zip_5=${zip}`}
      width='100%'
      marginHeight={0}
      frameBorder={0}
      id='frame2'
      scrolling='no'
      title='vote.org'
    />
  </>
}

export const Unidentified = ({state}: StateField) => (<>
  <Title data-testid='status-title'>Sorry!</Title>
  <Text data-testid='status-detail'>
    Unfortunately, We do not have any information on vot by mail for {state}.
  </Text>
</>)
