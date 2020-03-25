import React from 'react'
import { Status, Statuses } from '../../common'

type StateField = {state: string}
type StatusProps<T extends Status> = React.PropsWithChildren<T & StateField>

export const Excuse = ({state}: StatusProps<Statuses.Excuse>) => (<>
  <h2 data-testid='status-title'>Sorry!</h2>
  <p data-testid='status-detail'>
    Your zipcode is in {state}.&nbsp;
    {state} does not allow all registered voters to vote by mail.
    You may still qualify depending on your circumstances.
    For more information, visit your state election website.
  </p>
</>)

export const NoExcuse = ({state}: StatusProps<Statuses.NoExcuse>) => (<>
  <h2 data-testid='status-title'>Great News!</h2>
  <p data-testid='status-detail'>
    Your zipcode is in {state}.&nbsp;
    {state} allows all registered voters to vote by mail.
    Unfortuantely, we do not yet support your State.
    For more information, visit your state election website.
  </p>
</>)

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

export const Unidentified = ({state}: StateField) => (<>
  <h2 data-testid='status-title'>Sorry!</h2>
  <p data-testid='status-detail'>
    Your zipcode is in {state}.&nbsp;
    Unfortunately, We do not have any information on vot by mail for {state}.
  </p>
</>)
