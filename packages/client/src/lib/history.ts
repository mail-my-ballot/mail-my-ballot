import { useHistory, useLocation } from "react-router-dom"

export const useAppHistory = () => {
  const history = useHistory()
  const _query = new URLSearchParams(useLocation().search)

  return {
    pushApp: () => {
      document.getElementById('app')?.scrollIntoView({
        behavior: 'smooth',
        block: 'start',
      })
      history.push('/#app')
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
