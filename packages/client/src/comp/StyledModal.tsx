import React, { useContext } from 'react'
import Modal from 'styled-react-modal'
import { StyledModalContext } from './ModalContext'

const ModalComponentStyled = Modal.styled`
  font-size: 1em;
  width: 60vw;
  height: 90vh;
  display: block;
  padding: 1em 2em;
  background-color: #fff;
  overflow: auto;
`

interface IModal {
  children: React.ReactChild
}

const StyledModal = ({ children }: IModal) => {
  const { modal, handleModal } = useContext(StyledModalContext)
  const toggleModal = () => {
    handleModal(!modal)
  }

  return (
    <ModalComponentStyled
      isOpen={modal}
      onBackgroundClick={toggleModal}
      onEscapeKeydown={toggleModal}>
      <button onClick={toggleModal}>Close</button>
      {children}
    </ModalComponentStyled>
  )
  }

export { StyledModal }