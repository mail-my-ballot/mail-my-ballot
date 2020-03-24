import { useHistory, useLocation } from "react-router-dom"

export const useAppHistory = () => {
  const history = useHistory()
  const _query = new URLSearchParams(useLocation().search)

  return {
    pushAddress: (state: string, zip: string) => {
      history.push(`/address/${state}/${zip}`)
      window.scrollTo(0, 0)
    },
    pushStateForm: (state: string) => {
      history.push(`/state/${state}`)
      window.scrollTo(0, 0)
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
