import React from 'react'
import { createContainer } from "unstated-next"

interface QueryState{
  errMsg: JSX.Element | string
  infoMsg: JSX.Element | string
}
const initialQueryState: QueryState = {errMsg: '', infoMsg: ''}

// TODO: make this handle multiple simultaneous queires
// In practice, a single query at a time is probably good enoguh
const useQueryContainer = ({errMsg, infoMsg}: QueryState = initialQueryState) => {
  const [_errMsg,  _setErr ] = React.useState(errMsg)
  const [_infoMsg, _setInfo] = React.useState(infoMsg)
  const load = (infoMsg: JSX.Element | string) => {
    _setErr('')
    _setInfo(infoMsg)
  }
  const error = (errMsg: JSX.Element | string) => {
    _setErr(errMsg)
    _setInfo('')
  }
  const success = async (infoMsg: JSX.Element | string, durationMs = 2000) => {
    _setErr('')
    _setInfo(infoMsg)
    await new Promise(r => setTimeout(r, durationMs))
    _setInfo('')
  }
  return { errMsg: _errMsg, infoMsg: _infoMsg, load, error, success }
}

export const QueryContainer = createContainer(useQueryContainer)
