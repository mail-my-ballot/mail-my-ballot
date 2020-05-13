import React from 'react'
import { Status, Statuses } from '../../common'
import { useAppHistory } from '../../lib/path'

type StateField = {state: string}
type StatusProps<T extends Status> = React.PropsWithChildren<T & StateField>

export const Automatic = ({state}: StatusProps<Statuses.Automatic>) => (<>
  <h2 data-testid='status-title'>Great News!</h2>
  <p data-testid='status-detail'>
    Your zipcode is in {state}.&nbsp;
    All registered voters in {state} are automatically enrolled in vote by mail.
    For more information, visit your state election website.
  </p>
</>)

export const Website = ({state, regUrl, infoUrl}: StatusProps<Statuses.Website>) => (<>
  <h2 data-testid='status-title'>Great News!</h2>
  <p data-testid='status-detail'>
    Your zipcode is in {state}.&nbsp;
    {state} allows registered voters to vote by mail.
    You can apply on the <a href={regUrl}>official state election application page</a>.
    For more information, visit your <a href={infoUrl}>state election website</a>.
  </p>
</>)

export const Mail = ({state, infoUrl}: StatusProps<Statuses.Mail>) => (<>
  <h2 data-testid='status-title'>Great News!</h2>
  <p data-testid='status-detail'>
    Your zipcode is in {state}.&nbsp;
    {state} allows registered voters to vote by mail.
    However, the state requires mailing a physical application, which we cannot support.
    For more information, visit your <a href={infoUrl}>state election website</a>.
  </p>
</>)

export const VbmApp = ({state, children}: StatusProps<Statuses.VbmApp>) => (<>
  <h2 data-testid='status-title'>Great News!</h2>
  <p data-testid='status-detail'>
    Your zipcode is in {state}.&nbsp;
    {state} allows registered voters to vote by mail and we can help you enroll.
  </p>
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

export const VoteDotOrg = ({state}: StatusProps<Statuses.VoteDotOrg>) => {
  useIframeResize()
  const { path } = useAppHistory()
  const zip = (path?.type === 'address' && path.zip) ? path.zip : ''

  // Grabbed from here https://www.vote.org/technology/
  return <>
    <h2 data-testid='status-title'>Great News!</h2>
    <p data-testid='status-detail'>
      Your zipcode is in {state}.&nbsp;
      You can register below through our friends at <a href='https://vote.org'>vote.org</a>
    </p>
    <iframe
      style={{marginTop: '2em'}}
      src={`https://absentee.vote.org/?partner=111111&state=${state}&campaign=free-tools&zip_5=${zip}`}
      width='100%'
      marginHeight={0}
      frameBorder={0}
      id='frame2'
      scrolling='no'
    />
  </>
}

export const Unidentified = ({state}: StateField) => (<>
  <h2 data-testid='status-title'>Sorry!</h2>
  <p data-testid='status-detail'>
    Your zipcode is in {state}.&nbsp;
    Unfortunately, We do not have any information on vot by mail for {state}.
  </p>
</>)
