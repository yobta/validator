import type { YobtaContext } from '../_internal/createContext/index.js'
import type { SyncRule } from '../ruleYobta/index.js';
import { ruleYobta } from '../ruleYobta/index.js'

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
