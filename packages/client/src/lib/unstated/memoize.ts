import React from 'react'

// From https://stackoverflow.com/a/52645018/8930600
// eslint-disable-next-line @typescript-eslint/no-explicit-any
const deepEqual = (a: any, b: any): boolean => {
  if (a === b) return true
  if (typeof a !== typeof b) return false
  if (a instanceof Date && b instanceof Date) return a.getTime() === b.getTime()
  if (!a || !b || (typeof a !== 'object' && typeof b !== 'object')) return a === b
  const keys = Object.keys(a)
  if (keys.length !== Object.keys(b).length) return false
  return keys.every(k => deepEqual(a[k], b[k]))
}

// From https://stackoverflow.com/a/54096391/8930600
export const useDeepMemoize = <T extends object | null>(val: T): T => {
  const ref = React.useRef<T>()

  if (!deepEqual(val, ref.current)) {
    ref.current = val
  }
  
  return ref.current ?? val
}
