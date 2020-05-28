import React from 'react'
import Button from 'muicss/lib/react/button'
import { ButtonProps } from 'muicss/react'
import styled from 'styled-components'

const LargeButton: React.FC<ButtonProps> = (props) => {
  return <Button variant='raised' size='large' {...props}/>
}

export const RoundedButton = styled(LargeButton)`
  border-radius: 4px;
  font-size: 16px;
  font-weight: 600;
  line-height: 22px;
  padding: 14px 24px;
  height: 50;
`
const MediumButton: React.FC<ButtonProps> = (props) => {
  return <Button variant='raised' {...props}/>
}

export const SmallButton = styled(MediumButton)`
  border-radius: 4px;
  font-size: 12px;
  font-weight: 600;
  line-height: 16px;
  padding: 10px 18px;
  height: 36;
`

