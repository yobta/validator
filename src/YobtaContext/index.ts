import { YobtaError } from '../YobtaError'

export type YobtaContext = {
  data: any
  field: string
  path: string[]
  pushError(error: YobtaError): void
}
