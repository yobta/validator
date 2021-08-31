export type YobtaErrorPath = (string | number)[]

export type YobtaErrorMetadata = {
  field: string
  message: string
  path: YobtaErrorPath
}

export class YobtaError extends Error {
  constructor({ field, message, path }: YobtaErrorMetadata) {
    super(message)
    this.name = 'YobtaError'
    this.field = field
    this.path = path
  }

  field: string
  path: YobtaErrorPath
}
