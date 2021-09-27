import { createRule, AsyncRule } from '../createRule'
import { YobtaContext } from '../YobtaContext'

interface Submitter<I> {
  (input: I, context: YobtaContext): Promise<void>
}

interface AwaitSubmitFactory {
  <I>(submitter: Submitter<I>): AsyncRule<I, I>
}

export const awaitSubmitYobta: AwaitSubmitFactory = submitter =>
  createRule(async (input, context) => {
    let { data, errors } = context
    if (data instanceof Event && data.type === 'submit' && !errors.length) {
      await submitter(input, context)
    }
    return input
  })
