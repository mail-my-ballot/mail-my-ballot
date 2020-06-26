import React from 'react'
import styled, { keyframes } from 'styled-components'
import { FetchingDataContainer } from '../../lib/unstated'

const fadeIn = keyframes`
  from { opacity: 0 }
  to { opacity: 1 }
`

const OverlayStyle = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  z-index: 99;

  width: 100vw;
  height: 100vh;
  background-color: rgba(255, 255, 255, 0.6);
  animation: ${fadeIn} ease .3s both;

  display: flex;
  align-items: center;
  justify-content: center;

  i {
    font-size: 32px;
    color: #2592f6;
    text-shadow: 0 0 6px #2592f677;
  }
`

export const LoadingOverlay: React.FC = () => {
  const { fetchingData } = FetchingDataContainer.useContainer()
  if (fetchingData) {
    return <OverlayStyle id='loadingIndicatorOverlay'>
      <i className="fa fa-circle-o-notch fa-spin"/>
    </OverlayStyle>
  }
  return null
}
