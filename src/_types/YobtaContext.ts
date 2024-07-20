import type { YobtaError } from '../YobtaError'
import type { YobtaPath } from './YobtaPath'

export type YobtaContext = {
  data: any
  errors: YobtaError[]
  event: any
  field: string
  form?: HTMLFormElement
  input?: HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
  path: YobtaPath
  pushError(error: YobtaError): void
}
