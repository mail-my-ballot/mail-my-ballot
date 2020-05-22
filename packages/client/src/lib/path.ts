import React from "react"
import { useHistory, useLocation, matchPath } from "react-router-dom"
import { pageView } from "./analytics"
import { useDeepMemoize } from "./unstated"

type QueryParams = Record<string, string>

const allPathEnums = [
  'start',
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

export interface StartPath extends PathBase {
  type: 'start'
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
  | StartPath
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

export const toUrl = <P extends Path>(path: P, query: QueryParams = {}): string => {
  // arg -- can't get around this typecast  
  const rawUrl = (pathData[path.type] as PathDatum<P>).toRawUrl(path)
  const queryUrl = (query) ? ('?' + new URLSearchParams(query).toString()) : ''

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
  const matches = allPathEnums.map(e => rawToPath<StartPath>(pathname, e, query, true))
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
    pushStart: React.useCallback(() => pushScroll({oid, type: 'start'}), [oid, pushScroll]),
    pushAddress: React.useCallback((state: string, zip?: string) => {
      pushScroll({oid, type: 'address', state, zip}, {scroll: '1'})
    }, [oid, pushScroll]),
    pushState: React.useCallback((state: string, query: QueryParams = {}) => {
      pushScroll({oid, type: 'state', state}, query)
    }, [oid, pushScroll]),
    pushSuccess: React.useCallback((id: string) => {
      pushScroll({oid, type: 'success', id})
    }, [oid, pushScroll]),
    query,
  }
}
