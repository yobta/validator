import type { YobtaContext } from '../../_types/YobtaContext.js'
import type { YobtaError } from '../../YobtaError/index.js'

export const createContext = (event: any): YobtaContext => {
  const errors: YobtaError[] = []

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
