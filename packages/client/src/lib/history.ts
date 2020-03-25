import { useHistory, useLocation } from "react-router-dom"

export const useAppHistory = () => {
  const history = useHistory()
  const _query = new URLSearchParams(useLocation().search)

  return {
    pushAddress: (state: string, zip: string) => {
      history.push(`/address/${state}/${zip}`)
      document.getElementById('address-form')?.scrollIntoView({
        behavior: 'smooth',
        block: 'start',
      })
    },
    pushStateForm: (state: string) => {
      history.push(`/state/${state}`)
      document.getElementById('state-form')?.scrollIntoView({
        behavior: 'smooth',
        block: 'start',
      })
    },
    pushSuccess: (id: string) => {
      history.push(`/success?id=${id}`)
      window.scrollTo(0, 0)
    },
    query: (id: string) => {
      return _query.get(id)
    }
  }
}
