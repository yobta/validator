import type { YobtaContext } from '../../_types/YobtaContext.js'
import type { YobtaError } from '../../YobtaError/index.js'

interface YobtaContextFactory {
  (data: any): YobtaContext
}

export const createContext: YobtaContextFactory = event => {
  if (event?.type === 'submit' && event.preventDefault) {
    event.preventDefault()
  }

  const errors: YobtaError[] = []
  const element = event?.currentTarget || event
  const form = element?.tagName === 'FORM' ? element : undefined
  const input = (form && event?.target !== form && event.target) || undefined

  return {
    data: event,
    errors,
    event,
    field: '@',
    form,
    input,
    path: [],
    pushError(error) {
      errors.push(error)
    },
  }
}
