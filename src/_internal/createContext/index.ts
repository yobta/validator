import { YobtaError } from '../YobtaError'

export type Path = (string | number)[]

export type YobtaContext = {
  event: any
  data: any
  errors: YobtaError[]
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
  let form =
    event?.currentTarget instanceof HTMLFormElement
      ? event.currentTarget
      : undefined
  let input = (form && event?.target !== form && event.target) || undefined
  return {
    event,
    data: event,
    errors,
    field: '@',
    form,
    input,
    path: [],
    pushError(error) {
      errors.push(error)
    },
  }
}
