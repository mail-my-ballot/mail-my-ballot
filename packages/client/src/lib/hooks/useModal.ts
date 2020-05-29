import { useState } from 'react'

// custom useModal hook
export default () => {
  const [modal, setModal] = useState(false)

  const handleModal = () => setModal(!modal)

  return { modal, handleModal }
}