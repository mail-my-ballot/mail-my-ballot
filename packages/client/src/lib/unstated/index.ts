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

  const handleChanges = (fetching: boolean, waitForPromise?: Promise<unknown>) => {
    const cursor = fetching ? 'wait' : 'initial'
    document.documentElement.style.setProperty('--pageCursor', cursor)
    setFetchingData(fetching)

    waitForPromise?.then(() => {
      setFetchingData(false)
      document.documentElement.style.setProperty('--pageCursor', 'initial')
    })
  }

  return {
    fetchingData,
    /**
     * Allows to change the cursor being displayed on screen, when fetchingData
     * is true it changes to match the OS default cursor for loading data.
     *
     * @param fetching The state which fetchingData will be set, will override
     * previous values
     * @param waitForPromise Upon completion of the promise automatically sets
     * fetchingData to false
     */
    setFetchingData: handleChanges,
  }
}

export const FetchingDataContainer = createContainer(useFetchingDataContainer)

export * from './voter'
export * from './memoize'
