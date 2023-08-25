import type { YobtaError } from '../../YobtaError/index.js'

export type Path = (number | string)[]

export type YobtaContext = {
  data: any
  errors: YobtaError[]
  event: any
  field: string
  form?: HTMLFormElement
  input?: HTMLInputElement | HTMLSelectElement
  path: Path
  pushError(error: YobtaError): void
}

interface YobtaContextFactory {
  (data: any): YobtaContext
}

export const createContext: YobtaContextFactory = event => {
  if (event?.type === 'submit' && event.preventDefault) {
    event.preventDefault()
  }

  let errors: YobtaError[] = []
  let element = event?.currentTarget || event
  let form = element?.tagName === 'FORM' ? element : undefined
  let input = (form && event?.target !== form && event.target) || undefined

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
