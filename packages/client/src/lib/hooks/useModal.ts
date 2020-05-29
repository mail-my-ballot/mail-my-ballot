import { useState } from 'react'

// custom useModal hook
export default () => {
  const [modal, setModal] = useState(true)
  
  const handleModal = () => setModal(!modal)

  return { modal, handleModal }
}