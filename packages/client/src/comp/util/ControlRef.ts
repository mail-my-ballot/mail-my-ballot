import React from 'react'
import { Checkbox } from 'muicss/react'

type ControlRef<T> = React.RefObject<T> & { value: () => string | null }

export function useControlRef<T>(): ControlRef<T> {
  const ref = React.useRef<T>(null)
  return {
    ...ref,
    value: function() {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      return (this.current as any | null)?.controlEl?.value
    }
  }
}

type CheckedRef = React.RefObject<Checkbox> & { value: () => boolean | null }

export function useCheckboxRef(): CheckedRef {
  const ref = React.useRef<Checkbox>(null)
  return {
    ...ref,
    value: function() {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      return (this.current as any | null)?.controlEl?.checked as boolean
    }
  }
}
