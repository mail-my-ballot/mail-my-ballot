import { useHistory, useLocation, matchPath } from "react-router-dom"

// eslint-disable-next-line @typescript-eslint/no-namespace
export interface Start {
  path: '/'
}
export const startPath = '/'

export interface Address {
  path: '/address/:state/:zip?'
  state: string
  zip?: string
}
export const addressPath = '/address/:state/:zip?'

export interface State {
  path: '/state/:state'
  state: string
}
export const statePath = '/state/:state'

export interface Success {
  path: '/success'
  id: string
}
export const successPath = '/success'

export type Path = (
  | Start
  | Address
  | State
  | Success
)

export const toUrl = (path: Path): string => {
  switch(path.path) {
    case startPath: return startPath
    case addressPath: return `/address/${path.state}/${path.zip}`
    case statePath: return `/state/${path.state}`
    case successPath: return successPath
  }
}

const rawToPath = <T extends Path>(url: string, path: string, exact: boolean = false): T | null => {
  const match = matchPath<T>(url, { path, exact })
  if (!match) return null
  return match.params
}

export const toPath = (url: string): Path | null => {
  return (
    rawToPath<Start>(url, startPath, true) ||
    rawToPath<Address>(url, addressPath) ||
    rawToPath<State>(url, statePath) ||
    rawToPath<Success>(url, successPath) ||
    null
  )
}

export const toScrollId = (path: Path) => {
  switch(path.path) {
    case startPath: return 'start'
    case addressPath: return 'address-form'
    case statePath: return 'state-form'
    case successPath: return 'success'
  }
}

const scrollToId = (id: string) => {
  document.getElementById(id)?.scrollIntoView({
    behavior: 'smooth',
    block: 'start',
  })
}

export const useAppHistory = () => {
  const history = useHistory()
  const _query = new URLSearchParams(useLocation().search)
  const pushScroll = (path: Path) => {
    history.push(toUrl(path))
    scrollToId(toScrollId(path))
  }

  return {
    pushScroll,
    pushStart: () => pushScroll({path: startPath}),
    pushAddress: (state: string, zip?: string) => {
      pushScroll({path: addressPath, state, zip})
    },
    pushStateForm: (state: string) => {
      pushScroll({path: statePath, state})
    },
    pushSuccess: (id: string) => {
      pushScroll({path: successPath, id})
    },
    query: (id: string) => {
      return _query.get(id)
    }

  }
}
