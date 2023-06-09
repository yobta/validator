import { ruleYobta, AsyncRule } from '../ruleYobta/index.js'
import { YobtaContext } from '../_internal/createContext/index.js'
import { handleUnknownError } from '../_internal/parseUnknownError/index.js'

interface Submitter<I> {
  (input: I, context: YobtaContext): Promise<void>
}

interface AwaitSubmitFactory {
  <I>(submit: Submitter<I>): AsyncRule<I, I>
}

export const awaitSubmitYobta: AwaitSubmitFactory = submit =>
  ruleYobta(async (input, context) => {
    let { event, errors, pushError, field, path } = context
    if (event?.type === 'submit' && !errors.length) {
      try {
        await submit(input, context)
      } catch (error) {
        let yobtaError = handleUnknownError({ error, field, path })
        pushError(yobtaError)
      }
    }
    return input
  })
