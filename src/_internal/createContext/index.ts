import { YobtaError } from '../YobtaError'

export type Path = (string | number)[]

export type YobtaContext = {
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

export const createContext: YobtaContextFactory = data => {
  if (data?.type === 'submit' && data.preventDefault) {
    data.preventDefault()
  }
  let errors: YobtaError[] = []
  let form =
    data?.currentTarget instanceof HTMLFormElement
      ? data.currentTarget
      : undefined
  let input = (form && data?.target !== form && data.target) || undefined
  return {
    data,
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
