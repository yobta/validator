import { YobtaError, YobtaErrorPath } from '../../YobtaError'

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
  let message = error instanceof Error ? error.message : String(error)
  return new YobtaError({ message, field, path })
}
