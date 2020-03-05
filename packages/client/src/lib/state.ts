import React from 'react'
import { createContainer } from "unstated-next"
import { Address } from '../common'

const useAddressContainer = (initialState: (Address | null) = null) => {
  const [address, setAddress] = React.useState<Address | null>(initialState)
  return { address, setAddress }
}

export const AddressContainer = createContainer(useAddressContainer)

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
