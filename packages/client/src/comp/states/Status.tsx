import React from 'react'
import { State } from '../../common'

export const Excuse = ({state} : {state: State}) => (<>
  <h2>Sorry!</h2>
  <p>
    {state} does not allow all registered voters to vote by mail.
    You may still qualify depending on circumstances.
    For more information, visit your state election website.
  </p>
</>)

export const NoExcuse = ({state} : {state: State}) => (<>
  <h2>Great News!</h2>
  <p>
    {state} allows all registered voters to vote by mail.
    Unfortuantely, we do not yet support your State.
    For more information, visit your state election website.
  </p>
</>)

export const Automatic = ({state} : {state: State}) => (<>
  <h2>Great News!</h2>
  <p>
    All registered voters in {state} are automatically enrolled in vote by mail.
    For more information, visit your state election website.
  </p>
</>)

export const Website = (
  {state, regUrl, infoUrl} : {
    state: State,
    regUrl: string,
    infoUrl: string
  }
) => (<>
  <h2>Great News!</h2>
  <p>
    {state} allows registered voters to vote by mail.
    You can enroll on the <a href={regUrl}>official state election enrollment page</a>.
    For more information, visit your <a href={infoUrl}>state election website</a>.
  </p>
</>)

export const Mail = (
  {state, infoUrl} : {
    state: State,
    infoUrl: string
  }
) => (<>
  <h2>Great News!</h2>
  <p>
    {state} allows registered voters to vote by mail.
    However, they require a mailed application, which we cannot support.
    For more information, visit your <a href={infoUrl}>state election website</a>.
  </p>
</>)

export const VbmApp = (
  {children}: React.PropsWithChildren<{state: State}>,
) => (<>
  <h2>Great News!</h2>
  <p>
    <p>Congratulations: your app</p>
    <p>
      {state} allows registered voters to vote by mail and we can help you enroll in VBM.
    </p>
    { children }
  </p>
</>)
