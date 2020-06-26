import React from 'react'
import { createContainer } from "unstated-next"
import { Address, ContactData, Analytics, toLocale, Locale, toContactMethod, ContactMethod, FeatureFlags } from '../../common'

const useAddressContainer = (initialState: (Address | null) = null) => {
  const [address, setAddress] = React.useState<Address | null>(initialState)
  const locale: Locale | null = address ? toLocale(address) : null
  return { address, setAddress, locale }
}

export const AddressContainer = createContainer(useAddressContainer)

const useContactContainer = (initialState: (ContactData | null) = null) => {
  const [contact, setContact] = React.useState<ContactData | null>(initialState)
  const method: ContactMethod | null = toContactMethod(contact)
  return { contact, setContact, method }
}
export const ContactContainer = createContainer(useContactContainer)

const useAnalyticsContainer = (initialAnalytics: Analytics | null = null) => {
  const [analytics, setAnalytics] = React.useState(initialAnalytics)
  return { analytics, setAnalytics }
}

export const AnalyticsContainer = createContainer(useAnalyticsContainer)

const useFeatureFlagsContainer = (initialFeatureFlags: FeatureFlags | null = null) => {
  const [featureFlags, setFeatureFlags] = React.useState(initialFeatureFlags)
  return { featureFlags, setFeatureFlags }
}

export const FeatureFlagsContainer = createContainer(useFeatureFlagsContainer)

/**
 * When true replaces the mouse cursor with the operating system's default
 * for loading information.
 */
const useFetchingDataContainer = (initialFetching = false) => {
  const [fetchingData, setFetchingData] = React.useState(initialFetching)

  return { fetchingData, setFetchingData }
}

export const FetchingDataContainer = createContainer(useFetchingDataContainer)

export * from './voter'
export * from './memoize'
