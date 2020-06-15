import React from 'react'
import { Checkbox } from 'muicss/react'
import { useRef } from 'preact/compat'

type ControlRef<T> = React.RefObject<T> & { value: () => string | null }

export function useControlRef<T>(): ControlRef<T> {
  const ref = useRef<T>(null)
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
  const ref = useRef<Checkbox>(null)
  return {
    ...ref,
    value: function() {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      return (this.current as any | null)?.controlEl?.checked as boolean
    }
  }
}
