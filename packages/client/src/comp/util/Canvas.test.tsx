import React from 'react'
jest.unmock('react-signature-canvas')
import SignatureCanvas from 'react-signature-canvas'
import 'jest-canvas-mock'
import { render, fireEvent, wait, act, RenderResult } from '@testing-library/react'

import { Canvas } from './Canvas'


describe('Canvas', () => {
  const setup = () => {
    const setSignature = jest.fn<void, [string | null]>()
    const renderResult = render(<Canvas
      setSignature={setSignature}
      width={100}
      height={100}
    />)

    return {...renderResult, setSignature}
  }

  const sign = ({getByTestId}: RenderResult) => {
    // now sign form
    act(() => {
      // Mock signing
      // TODO: this doesn't work
      SignatureCanvas.prototype.isEmpty = jest.fn(() => false)
      SignatureCanvas.prototype.toDataURL = jest.fn(() => 'abcd')

      // Code triggers on mouseUp but apparently we need to fire touchEnd
      // See: https://stackoverflow.com/a/41070796/8930600
      fireEvent.touchEnd(getByTestId('canvas'), {
        bubbles: true,
        cancelable: true,
      })
    })
  }

  test('Signing triggers callback ', async () => {
    const { setSignature, ...renderResult } = setup()

    await wait(() => expect(setSignature).toHaveBeenCalledTimes(0))
    
    sign(renderResult)

    // TODO: check setSignature.mock.calls is not being called with null
    await wait(() => expect(setSignature).toHaveBeenCalledTimes(1))
  })
})
