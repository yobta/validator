import { ruleYobta, SyncRule } from '../ruleYobta'
import { YobtaContext } from '../_internal/createContext'

interface Handler<I> {
  (input: I, context: YobtaContext): void
}

interface SuccessFactory {
  <I>(handle: Handler<I>): SyncRule<I, I>
}

export const successYobta: SuccessFactory = handle =>
  ruleYobta((input, context) => {
    if (!context.errors.length) {
      handle(input, context)
    }
    return input
  })
