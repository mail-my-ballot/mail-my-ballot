import React from 'react'

type ControlRef<T> = React.RefObject<T> & { value: () => string }

export function createControlRef<T>(): ControlRef<T> {
  const ref = React.createRef<T>()
  return {
    ...ref,
    value: function() {
      return (this.current as any).controlEl.value
    }
  }
}
