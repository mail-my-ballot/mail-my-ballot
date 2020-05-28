import React from 'react'
import { Status, Statuses } from '../../common'
import { H1, P } from '../util/Text'

interface StateField {
  state: string
  zip?: string
}
type StatusProps<T extends Status> = React.PropsWithChildren<T & StateField>

export const Automatic = ({state}: StatusProps<Statuses.Automatic>) => (<>
  <H1 data-testid='status-title'>Great News!</H1>
  <P data-testid='status-detail'>
  {state} automatically enrolls all registered voters to vote by mail.
    For more information, visit your state election website.
  </P>
</>)

export const Website = ({state, regUrl, infoUrl}: StatusProps<Statuses.Website>) => (<>
  <H1 data-testid='status-title'>Great News!</H1>
  <P data-testid='status-detail'>
    {state} allows all registered voters to vote by mail.
    You can apply on the <a href={regUrl}>official state election application page</a>.
    For more information, visit your <a href={infoUrl}>state election website</a>.
  </P>
</>)

export const Mail = ({state, infoUrl}: StatusProps<Statuses.Mail>) => (<>
  <H1 data-testid='status-title'>Great News!</H1>
  <P data-testid='status-detail'>
    {state} allows all registered voters to vote by mail.
    However, the state requires mailing a physical application, which we cannot support.
    For more information, visit your <a href={infoUrl}>state election website</a>.
  </P>
</>)

export const VbmApp = ({state, children}: StatusProps<Statuses.VbmApp>) => (<>
  <H1 data-testid='status-title'>Great News!</H1>
  <P data-testid='status-detail'>
    {state} allows all registered voters to vote by mail and we can help you enroll.
  </P>
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
    <H1 data-testid='status-title'>Great News!</H1>
    <P data-testid='status-detail'>
      You can sign up below through our friends at <a href='https://vote.org'>Vote.org</a>
    </P>
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
  <H1 data-testid='status-title'>Sorry!</H1>
  <P data-testid='status-detail'>
    Unfortunately, We do not have any information on vot by mail for {state}.
  </P>
</>)
