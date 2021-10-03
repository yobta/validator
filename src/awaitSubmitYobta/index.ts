import { ruleYobta, AsyncRule } from '../ruleYobta'
import { YobtaContext } from '../_internal/createContext'

interface Submitter<I> {
  (input: I, context: YobtaContext): Promise<void>
}

interface AwaitSubmitFactory {
  <I>(submit: Submitter<I>): AsyncRule<I, I>
}

export const awaitSubmitYobta: AwaitSubmitFactory = submit =>
  ruleYobta(async (input, context) => {
    let { event, errors } = context
    if (event instanceof Event && event.type === 'submit' && !errors.length) {
      await submit(input, context)
    }
    return input
  })
