import React from 'react'
import Checkbox from 'muicss/lib/react/checkbox'
import { CheckboxProps } from 'muicss/react'

import { Red } from './Util'

export const AppCheckbox = React.forwardRef<Checkbox, CheckboxProps>(function AppCheckbox(props, ref) {
  return <Checkbox
    {...props}
    label={<span>{props.label} {props.required ? <Red>*</Red> : null}</span>}
    ref={ref}
  />
})
