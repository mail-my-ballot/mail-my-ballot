import { useHistory, useLocation, matchPath } from "react-router-dom"
import { pageView } from "./analytics"

const allPathEnums = [
  'start',
  'address',
  'state',
  'success',
] as const
export type PathEnum = (typeof allPathEnums)[number]

interface PathBase {
  type: PathEnum
  oid: string
  scroll?: string
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
export interface SuccessPath extends PathBase {
  type: 'success'
  id?: string
}

export type Path = (
  | StartPath
  | AddressPath
  | StatePath
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
  'success': {
    path: '/org/:oid/success/:id?',
    toRawUrl: ({oid, id}) => `/org/${oid}/success/${id || ''}`,
    scrollId: 'success',
  }
}

export const toUrl = <P extends Path>(path: P): string => {
  // arg -- can't get around this typecast
  const rawUrl = (pathData[path.type] as PathDatum<P>).toRawUrl(path)
  return rawUrl + (path.scroll ? `?scroll=${path.scroll}` : '')
}

const defaultOid = 'default'
export const defaultUrl = toUrl({type:'start', oid:defaultOid})

const rawToPath = <P extends Path>(url: string, pathEnum: PathEnum, query: Record<string, string>, exact = false): P | null => {
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

export const toPath = (pathname: string, query: Record<string, string>): Path | null => {
  const matches = allPathEnums.map(e => rawToPath<StartPath>(pathname, e, query, true))
  return matches.reduce((x, y) => x || y, null)
}

const scrollToId = (id: string) => {
  document.getElementById(id)?.scrollIntoView({
    behavior: 'smooth',
    block: 'start',
  })
}

export const parseQS = (search: string): Record<string, string> => {
  return Object.fromEntries((new URLSearchParams(search)).entries())
}

export const useAppHistory = () => {
  const history = useHistory()
  const { pathname, search } = useLocation()
  const query = parseQS(search)
  const path = toPath(pathname, query)
  const oid = path?.oid || defaultOid
  
  const pushScroll = (path: Path) => {
    history.push(toUrl(path))
    scrollToId(pathData[path.type].scrollId)
    pageView()
  }

  return {
    path,
    oid,
    pushStart: () => pushScroll({oid, type: 'start'}),
    pushAddress: (state: string, zip?: string) => {
      pushScroll({oid, type: 'address', state, zip, scroll: '1'})
    },
    pushState: (state: string) => {
      pushScroll({oid, type: 'state', state})
    },
    pushSuccess: (id: string) => {
      pushScroll({oid, type: 'success', id})
    },
    query,
  }
}
