import type { YobtaContext } from '../../_types/YobtaContext.js'
import type { YobtaError } from '../../YobtaError/index.js'

export const createContext = (event: any): YobtaContext => {
  const errors: YobtaError[] = []

  // NOTE: must be hoisted to context factory to deal with async validation
  if (event instanceof Event && event.type === 'submit') {
    event.preventDefault()
  }

  return {
    data: event,
    errors,
    event,
    field: '@',
    path: [],
    pushError(error) {
      errors.push(error)
    },
    value: event,
  }
}
