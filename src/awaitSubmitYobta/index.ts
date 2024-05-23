import type { YobtaContext } from '../_internal/createContext/index.js'
import { handleUnknownError } from '../_internal/parseUnknownError/index.js'
import type { AsyncRule } from '../ruleYobta/index.js';
import { ruleYobta } from '../ruleYobta/index.js'

interface Submitter<I> {
  (input: I, context: YobtaContext): Promise<void>
}

interface AwaitSubmitFactory {
  <I>(submit: Submitter<I>): AsyncRule<I, I>
}

export const awaitSubmitYobta: AwaitSubmitFactory = submit =>
  ruleYobta(async (input, context) => {
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
