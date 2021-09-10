import { YobtaError } from '../YobtaError'

export type Path = (string | number)[]

export type YobtaContext = {
  data: any
  errors: YobtaError[]
  field: string
  path: Path
  pushError(error: YobtaError): void
}
