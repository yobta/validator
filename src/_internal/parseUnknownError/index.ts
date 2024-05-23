import type { YobtaErrorPath } from '../../YobtaError/index.js';
import { YobtaError } from '../../YobtaError/index.js'

interface UnknownErrorInput {
  error: unknown
  field: string
  path: YobtaErrorPath
}
interface HandleUnknownError {
  (input: UnknownErrorInput): YobtaError
}

export const handleUnknownError: HandleUnknownError = ({
  error,
  field,
  path,
}) => {
  if (error instanceof YobtaError) {
    return error
  }
  const message = error instanceof Error ? error.message : String(error)
  return new YobtaError({ field, message, path })
}
