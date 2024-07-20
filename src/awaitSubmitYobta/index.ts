import { handleUnknownError } from '../_internal/parseUnknownError/index.js'
import type { YobtaContext } from '../_types/YobtaContext.js'
import type { AsyncRule } from '../ruleYobta/index.js'
import { ruleYobta } from '../ruleYobta/index.js'

interface Submitter<I> {
  (input: I, context: YobtaContext): Promise<void>
}

export const awaitSubmitYobta = <I>(submit: Submitter<I>): AsyncRule<I, I> =>
  ruleYobta<I, I>(async (input, context) => {
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
