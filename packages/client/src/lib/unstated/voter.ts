import React from 'react'
import { createContainer } from "unstated-next"
import { Voter, UTM, ExperimentName } from '../../common'
import { useDeepMemoize } from './memoize'
import { experiments } from '../experiment'

const localStorageKey = 'voter-data'

// https://medium.com/@jrcreencia/persisting-redux-state-to-local-storage-f81eb0b90e7e
const loadLocalStorage = (): Partial<Voter> => {
  const serialized = localStorage.getItem(localStorageKey)
  if (serialized === null) return {}
  try {
    return JSON.parse(serialized) as Partial<Voter>
  } catch (e) {
    return {}
  }
}

const saveLocalStorage = (userData: Voter): void => {
  const serialized = JSON.stringify(userData)
  localStorage.setItem(localStorageKey, serialized)
}

const randomUserId = () => {
  // https://gist.github.com/6174/6062387
  return Math.random().toString(36).substring(2, 15)
}


/** Set initial state without overwriting data in localStorage */
const useVoterContainer = (uid: string = randomUserId()) => {
  const existingVoter = loadLocalStorage()
  const [voter, setVoter] = React.useState<Voter>({
    ...{uid},
    ...existingVoter 
  })
  const voterMemo = useDeepMemoize(voter)

  // Precompute experiment group
  const cacheExperimentGroup = useDeepMemoize(Object.fromEntries(experiments
    .map(exp => exp.group(uid))
    .map(({name, group}) => [name, group])
  ))

  const experimentGroup = React.useCallback((name: ExperimentName) => {
    return cacheExperimentGroup[name]
  }, [cacheExperimentGroup])

  /** Non-overwriting update of user data */
  const conservativeUpdateVoter = React.useCallback((utm: UTM) => {
    const newVoter = {...utm, ...voterMemo}
    saveLocalStorage(newVoter)
    setVoter(newVoter)
  }, [voterMemo])
  return { voter: voterMemo, conservativeUpdateVoter, experimentGroup }
}

export const VoterContainer = createContainer(useVoterContainer)
