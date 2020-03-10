import React from 'react'
import styled, {css} from 'styled-components'
import { QueryContainer } from '../lib/state'

type Props = React.PropsWithChildren<{type: "info" | "error" | undefined}>

const Floating = styled.div`
  border-style: solid;
  border-width: thin;
  padding: 1em;
  border-radius: 1em;
  background: #fafafa;
  z-index: 4;
  max-width: 300px;
  width: 100%;
  margin: 2em auto;
  box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19);
  ${(props: Props) => props.type === 'error' && css`
    border-color: #C62828;
    color: #C62828;
  `}}
  ${(props: Props) => props.type === 'info'  && css`
    border-color: #4DB6AC;
    color: #4DB6AC;
  `}}
`

const RawNotification = ({type, children}: Props) => {
  return <Floating type={type}>
    {children}
  </Floating>
}

export const Notification = () => {
  const { errMsg, infoMsg } = QueryContainer.useContainer()
  if (errMsg) {
    return <RawNotification type='error'>{errMsg}</RawNotification>
  }
  if (infoMsg) {
    return <RawNotification type='info'>{infoMsg}</RawNotification>
  }
  return null
}
