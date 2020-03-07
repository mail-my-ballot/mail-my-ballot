import React from 'react'

type ControlRef<T> = React.RefObject<T> & { value: () => string }

export function useControlRef<T>(): ControlRef<T> {
  const ref = React.useRef<T>(null)
  return {
    ...ref,
    value: function() {
      return (this.current as any).controlEl.value
    }
  }
}
