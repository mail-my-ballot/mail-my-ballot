import React from 'react'
import 'jest-canvas-mock'
import { Upload } from './Upload'

import { render, fireEvent, wait, act } from '@testing-library/react'
import { mocked } from 'ts-jest/utils'

describe('UploadButton', () => {
  const setup = (maxSizeMB: number) => {
    const setDataString = jest.fn<void, [string]>()
    const { getByTestId } = render(<Upload
      label='label'
      setDataString={setDataString}
      maxSizeMB={maxSizeMB}
    />)

    const clickInputSpy = jest.spyOn(HTMLInputElement.prototype, 'click')
        mocked(window, true).alert = jest.fn()

    return {clickInputSpy, getByTestId, setDataString}
  }

  const upload = (el: HTMLElement) => {
    act(() => {
      fireEvent.change(el, {
        target: {
          files: [
            new File(['somedata'], 'file.jpg')
          ] 
        }
      })
    })
  }

  test('Click triggers file callback', async () => {
    const { clickInputSpy, getByTestId } = setup(1)

    act(() => {
      fireEvent.click(getByTestId('upload-click-target'), {
        bubbles: true,
        cancelable: true,
      })
    })

    await wait(() => expect(clickInputSpy).toHaveBeenCalledTimes(1))
  })

  test('Upload file triggers', async () => {
    const { setDataString, getByTestId } = setup(1)

    await wait(() => expect(setDataString).toHaveBeenCalledTimes(0))
    
    upload(getByTestId('upload-input'))

    await wait(() => expect(window.alert).toHaveBeenCalledTimes(0))
    await wait(() => expect(setDataString).toHaveBeenCalledTimes(1))
  })

  test('Max size stops upload', async () => {
    const { setDataString, getByTestId }  = setup(5./1024/1024)

    await wait(() => expect(setDataString).toHaveBeenCalledTimes(0))
    
    upload(getByTestId('upload-input'))

    await wait(() => expect(window.alert).toHaveBeenCalledTimes(1))
    await wait(() => expect(setDataString).toHaveBeenCalledTimes(0))
  })
})
