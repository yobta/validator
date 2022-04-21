import { ruleYobta, AsyncRule } from '../ruleYobta/index.js'
import { YobtaContext } from '../_internal/createContext/index.js'

interface Submitter<I> {
  (input: I, context: YobtaContext): Promise<void>
}

interface AwaitSubmitFactory {
  <I>(submit: Submitter<I>): AsyncRule<I, I>
}

export const awaitSubmitYobta: AwaitSubmitFactory = submit =>
  ruleYobta(async (input, context) => {
    let { event, errors } = context
    if (event?.type === 'submit' && !errors.length) {
      await submit(input, context)
    }
    return input
  })
