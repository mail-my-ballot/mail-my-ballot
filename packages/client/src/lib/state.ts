import React from 'react'
import { createContainer } from "unstated-next"
import { Locale } from '../common'

const useLocaleContainer = (initialState: (Locale | null) = null) => {
  const [state, setState] = React.useState<Locale | null>(initialState)
  return { state, setState }
}

export const LocaleContainer = createContainer(useLocaleContainer)

const initialQueryState = {errMsg: '', isLoading: false}

const useQueryContainer = ({errMsg, isLoading} = initialQueryState) => {
  const [_errMsg, _setError] = React.useState(errMsg)
  const [_isLoading, _setLoading] = React.useState(isLoading)
  const startLoad = () => {
    _setError('')
    _setLoading(true)
  }
  const setError = (errMsg: string) => {
    _setError(errMsg)
    _setLoading(false)
  }
  const clearError = () => {
    _setError('')
    _setLoading(false)
  }
  return { errMsg: _errMsg, isLoading: _isLoading, startLoad, setError, clearError }
}

export const QueryContainer = createContainer(useQueryContainer)
