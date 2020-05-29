import React, { createContext} from 'react'
import useModal from '../lib/hooks/useModal'

type ModalContext = {
  handleModal(): void
  modal: boolean
}

interface IStyledModalProviderProps {
  children: React.ReactChild
}

const defaultContextValue = {
// eslint-disable-next-line @typescript-eslint/no-empty-function
  handleModal: () => {},
  modal: false
}

const StyledModalContext = createContext<ModalContext>(defaultContextValue)
const { Provider } = StyledModalContext

const StyledModalProvider = ({ children }: IStyledModalProviderProps) => {
  const { modal, handleModal } = useModal()
  return (
    <Provider value={{ handleModal, modal }}>
      {children}
    </Provider>
  )
}

export { StyledModalProvider, StyledModalContext }
