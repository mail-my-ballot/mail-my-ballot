import React from 'react'
import { Status, Statuses } from '../../common'
import { BareLocale } from '../../lib/type'

type StatusProps<T extends Status> = React.PropsWithChildren<Omit<T, 'status'> & BareLocale>

export const Excuse = ({state} : StatusProps<Statuses.Excuse>) => (<>
  <h2>Sorry!</h2>
  <p>
    {state} does not allow all registered voters to vote by mail.
    You may still qualify depending on circumstances.
    For more information, visit your state election website.
  </p>
</>)

export const NoExcuse = ({state} : StatusProps<Statuses.NoExcuse>) => (<>
  <h2>Great News!</h2>
  <p>
    {state} allows all registered voters to vote by mail.
    Unfortuantely, we do not yet support your State.
    For more information, visit your state election website.
  </p>
</>)

export const Automatic = ({state}: StatusProps<Statuses.Automatic>) => (<>
  <h2>Great News!</h2>
  <p>
    All registered voters in {state} are automatically enrolled in vote by mail.
    For more information, visit your state election website.
  </p>
</>)

export const Website = ({state, regUrl, infoUrl}: StatusProps<Statuses.Website>) => (<>
  <h2>Great News!</h2>
  <p>
    {state} allows registered voters to vote by mail.
    You can enroll on the <a href={regUrl}>official state election enrollment page</a>.
    For more information, visit your <a href={infoUrl}>state election website</a>.
  </p>
</>)

export const Mail = ({state, infoUrl}: StatusProps<Statuses.Mail>) => (<>
  <h2>Great News!</h2>
  <p>
    {state} allows registered voters to vote by mail.
    However, they require a mailed application, which we cannot support.
    For more information, visit your <a href={infoUrl}>state election website</a>.
  </p>
</>)

export const VbmApp = ({state, children}: StatusProps<Statuses.VbmApp>) => (<>
  <h2>Great News!</h2>
  <p>Congratulations: your app</p>
  <p>
    {state} allows registered voters to vote by mail and we can help you enroll in VBM.
  </p>
  { children }
</>)
