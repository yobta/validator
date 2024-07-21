import type { YobtaSyncRule } from '../ruleYobta/index.js'
import { ruleYobta } from '../ruleYobta/index.js'

export const numberMessage = 'It should be a number'

interface NumberFactory {
  (message?: string): YobtaSyncRule<unknown, number>
}

export const numberYobta: NumberFactory = (message = numberMessage) =>
  ruleYobta(value => {
    try {
      const number = Number(value ?? 0)
      if (Number.isFinite(number)) {
        return number
      }
    } catch {}
    throw new Error(message)
  })
