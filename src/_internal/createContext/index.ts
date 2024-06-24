import type { YobtaError } from '../../YobtaError/index.js'

export type Path = (number | string)[]

export type YobtaContext = {
  data: any
  errors: YobtaError[]
  event: any
  field: string
  form?: HTMLFormElement
  input?: HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
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
