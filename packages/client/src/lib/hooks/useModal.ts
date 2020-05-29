import { useState } from 'react'

// custom useModal hook
export default () => {
  const [modal, setModal] = useState(false)

  const handleModal = (isOpen: boolean) => {
    setModal(isOpen)
  }

  return { modal, handleModal }
}