import type { YobtaError } from '../YobtaError'
import type { YobtaPath } from './YobtaPath'

export type YobtaContext = {
  data: unknown
  errors: YobtaError[]
  event: unknown
  field: string
  form?: HTMLFormElement
  input?: HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
  path: YobtaPath
  pushError(error: YobtaError): void
  value: unknown
}
