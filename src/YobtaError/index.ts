export type YobtaErrorPath = (number | string)[]

export type YobtaErrorMetadata = {
  field: string
  message: string
  path: YobtaErrorPath
}

export class YobtaError extends Error {
  field: string

  name = 'YobtaError'
  path: YobtaErrorPath
  constructor({ field, message, path }: YobtaErrorMetadata) {
    super(message)
    this.field = field
    this.path = path
  }
}
