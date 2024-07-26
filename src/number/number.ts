import type { YobtaSyncRule } from '../ruleYobta/index.js'
import { ruleYobta } from '../ruleYobta/index.js'

export const numberMessage = 'It should be a number'

interface NumberFactory {
  (message?: string): YobtaSyncRule<unknown, number>
}

export const number: NumberFactory = (message = numberMessage) =>
  ruleYobta<unknown, number>(value => {
    try {
      const n = Number(value ?? 0)
      if (Number.isFinite(n)) {
        return n
      }
    } catch {}
    throw new Error(message)
  })
