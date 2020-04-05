import { toUrl, toPath, Path } from './path'

const toUrlAndBack = <P extends Path>(path: P): Path | null => {
  const url = toUrl(path)
  return toPath(url)
}

describe('Test PathData roundtrip translation', () => {
  it('start', () => {
    const path: Path = {type: 'start', oid: 'aclu'}
    expect(toUrlAndBack(path)).toEqual(path)
  })

  it('state', () => {
    const path: Path = {type: 'state', oid: 'aclu', state: 'Florida'}
    expect(toUrlAndBack(path)).toEqual(path)
  })

  it('address with zip', () => {
    const path: Path = {type: 'address', oid: 'aclu', state: 'Florida', zip: '11212'}
    expect(toUrlAndBack(path)).toEqual(path)
  })

  it('address without zip', () => {
    const path: Path = {type: 'address', oid: 'aclu', state: 'Florida'}
    expect(toUrlAndBack(path)).toEqual(path)
  })

  it('success', () => {
    const path: Path = {type: 'success', oid: 'aclu'}
    expect(toUrlAndBack(path)).toEqual(path)
  })

  it('success with id', () => {
    const path: Path = {type: 'success', oid: 'aclu', id: 'abc'}
    expect(toUrlAndBack(path)).toEqual(path)
  })
})

