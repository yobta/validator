import { handleUnknownError } from '../_internal/parseUnknownError/index.js'
import type { YobtaAsyncRule } from '../_types/YobtaAsyncRule.js'
import type { YobtaContext } from '../_types/YobtaContext.js'
import { createRule } from '../createRule/createRule.js'

interface Submitter<I> {
  (input: I, context: YobtaContext): Promise<void>
}

export const asyncSubmit = <I>(submit: Submitter<I>): YobtaAsyncRule<I, I> =>
  createRule<I, Promise<I>>(async (input, context) => {
    const { errors, event, field, path, pushError } = context
    if (event?.type === 'submit' && !errors.length) {
      try {
        await submit(input, context)
      } catch (error) {
        const yobtaError = handleUnknownError({ error, field, path })
        pushError(yobtaError)
      }
    }
    return input
  })
