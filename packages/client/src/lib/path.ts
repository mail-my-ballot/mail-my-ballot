import React from "react"
import { useHistory, useLocation, matchPath } from "react-router-dom"
import { pageView } from "./analytics"
import { useDeepMemoize } from "./unstated"

export type QueryParams = Record<string, string>

const startSectionsEnum = [
  'start',
  'about',
  'howItWorks',
  'getInvolved',
  'team',
  'contact',
] as const

const allPathEnums = [
  ...startSectionsEnum,
  'address',
  'state',
  'stateRedirect',
  'success',
] as const
export type PathEnum = (typeof allPathEnums)[number]

interface PathBase {
  type: PathEnum
  oid: string
}

/**
 * Sections found on the front page, this Path does not need any param
 * other than oid, i.e. id, state, etc.
 */
export interface StartSectionPath extends PathBase {
  type: (typeof startSectionsEnum)[number]
}
export interface AddressPath extends PathBase {
  type: 'address'
  state: string
  zip?: string
}
export interface StatePath extends PathBase {
  type: 'state'
  state: string
}

export interface StateRedirectPath extends PathBase {
  type: 'stateRedirect'
}
export interface SuccessPath extends PathBase {
  type: 'success'
  id?: string
}

export type Path = (
  | StartSectionPath
  | AddressPath
  | StatePath
  | StateRedirectPath
  | SuccessPath
)

interface PathDatum<P extends Path = Path> {
  path: string
  toRawUrl: (path: P) => string
  scrollId: string
}

type ByEnum<E extends PathEnum, P> = P extends {type: E} ? P : never
type PathByEnum<E extends PathEnum> = ByEnum<E, Path>
type PathData = { [E in PathEnum]: PathDatum<PathByEnum<E>> }

export const pathData: PathData = {
  'start': {
    path: '/org/:oid',
    toRawUrl: ({oid}) => `/org/${oid}`,
    scrollId: 'start',
  },
  'about': {
    path: '/org/:oid#about',
    toRawUrl: ({oid}) => `/org/${oid}#about`,
    scrollId: 'about'
  },
  'howItWorks': {
    path: '/org/:oid#howItWorks',
    toRawUrl: ({oid}) => `/org/${oid}#howItWorks`,
    scrollId: 'howItWorks'
  },
  'getInvolved': {
    path: '/org/:oid#getInvolved',
    toRawUrl: ({oid}) => `/org/${oid}#getInvolved`,
    scrollId: 'getInvolved'
  },
  'team': {
    path: '/org/:oid#team',
    toRawUrl: ({oid}) => `/org/${oid}#team`,
    scrollId: 'team'
  },
  'contact': {
    path: '/org/:oid#contact',
    toRawUrl: ({oid}) => `/org/${oid}#contact`,
    scrollId: 'contact'
  },
  'address': {
    path: '/org/:oid/address/:state/:zip?',
    toRawUrl: ({oid, state, zip}) => `/org/${oid}/address/${state}/${zip || ''}`,
    scrollId: 'address'
  },
  'state': {
    path: '/org/:oid/state/:state',
    toRawUrl: ({oid, state}) => `/org/${oid}/state/${state}`,
    scrollId: 'state',
  },
  'stateRedirect': {
    path: '/org/:oid/state',
    toRawUrl: ({oid}) => `/org/${oid}/state`,
    scrollId: 'stateRedirect',
  },
  'success': {
    path: '/org/:oid/success/:id?',
    toRawUrl: ({oid, id}) => `/org/${oid}/success/${id || ''}`,
    scrollId: 'success',
  }
}

const isEmpty = (query: QueryParams) => {
  return Object.values(query).filter(v => !!v).length === 0
}

export const toUrl = <P extends Path>(path: P, query: QueryParams = {}): string => {
  // arg -- can't get around this typecast
  const rawUrl = (pathData[path.type] as PathDatum<P>).toRawUrl(path)
  const queryUrl = isEmpty(query) ?  '' : ('?' + new URLSearchParams(query).toString())

  return rawUrl + queryUrl
}

const defaultOid = 'default'
export const defaultUrl = toUrl({type:'start', oid:defaultOid})

const rawToPath = <P extends Path>(
  url: string,
  pathEnum: PathEnum,
  query: QueryParams,
  exact = false
): P | null => {
  const { path } = pathData[pathEnum]
  const match = matchPath<P>(url, { path, exact })
  if (!match) return null
  return {
    type: pathEnum,
    ...match.params,
    // In Jest testing, URLSearchParams are always undefined so just don't use
    scroll: query['scroll'],
  }
}

export const toPath = (pathname: string, query: QueryParams): Path | null => {
  const matches = allPathEnums.map(e => rawToPath<StartSectionPath>(pathname, e, query, true))
  return matches.reduce((x, y) => x || y, null)
}

const scrollToId = (id: string) => {
  document.getElementById(id)?.scrollIntoView({
    behavior: 'smooth',
    block: 'start',
  })
}

export const parseQS = (search: string): QueryParams => {
  return Object.fromEntries((new URLSearchParams(search)).entries())
}

export const useAppHistory = () => {
  const history = useHistory()
  const { pathname, search } = useLocation()
  const query = useDeepMemoize(parseQS(search))
  const path = useDeepMemoize(toPath(pathname, query))
  const oid = path?.oid || defaultOid

  const pushScroll = React.useCallback((path: Path, query: QueryParams = {}) => {
    history.push(toUrl(path, query))
    scrollToId(pathData[path.type].scrollId)
    pageView()
  }, [history])

  return {
    path,
    oid,
    query,
    pushStartSection: React.useCallback(
      (section: StartSectionPath['type']) => {
        pushScroll({oid, type: section})
      },
      [oid, pushScroll]
    ),
    pushAddress: React.useCallback((state: string, zip?: string) => {
      pushScroll({oid, type: 'address', state, zip}, {...query, scroll: '1'})
    }, [oid, query, pushScroll]),
    pushState: React.useCallback((state: string) => {
      pushScroll({oid, type: 'state', state}, query)
    }, [oid, query, pushScroll]),
    pushSuccess: React.useCallback((id: string) => {
      pushScroll({oid, type: 'success', id}, query)
    }, [oid, query, pushScroll]),
  }
}
