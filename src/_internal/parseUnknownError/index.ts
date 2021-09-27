type ErrorLike = { name: string; message: string }

export function parseUnknownError(error: unknown): ErrorLike {
  if (error instanceof Error) {
    return error
  }
  return {
    name: 'Unknown error',
    message: String(error)
  }
}
