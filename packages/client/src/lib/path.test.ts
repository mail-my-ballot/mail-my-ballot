import { toUrl, toPath, Path, QueryParams, parseQS } from './path'

const toUrlAndBack = <P extends Path>(path: P, query: QueryParams): Path | null => {
  const url = toUrl(path, query)
  if (url.includes('?')) {
    const [pathname, search] = url.split('?')
    return toPath(pathname, parseQS(search))
  } else {
    return toPath(url, {})
  }
}

describe('Test PathData roundtrip translation', () => {
  it('start', () => {
    const path: Path = {type: 'start', oid: 'aclu'}
    expect(toUrlAndBack(path, {})).toEqual(path)
  })

  it('address with zip', () => {
    const path: Path = {type: 'address', oid: 'aclu', state: 'Florida', zip: '11212'}
    expect(toUrlAndBack(path, { scroll: '1' })).toEqual({...path, scroll: '1'})
  })

  it('address without zip', () => {
    const path: Path = {type: 'address', oid: 'aclu', state: 'Florida'}
    expect(toUrlAndBack(path, {})).toEqual(path)
  })

  it('state', () => {
    const path: Path = {type: 'state', oid: 'aclu', state: 'Florida'}
    expect(toUrlAndBack(path, {})).toEqual(path)
  })

  it('success', () => {
    const path: Path = {type: 'success', oid: 'aclu'}
    expect(toUrlAndBack(path, {})).toEqual(path)
  })

  it('success with id', () => {
    const path: Path = {type: 'success', oid: 'aclu', id: 'abc'}
    expect(toUrlAndBack(path, {})).toEqual(path)
  })
})

