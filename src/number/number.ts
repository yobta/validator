import type { YobtaSyncRule } from '../rule/rule.js'
import { rule } from '../rule/rule.js'

export const numberMessage = 'It should be a number'

interface NumberFactory {
  (message?: string): YobtaSyncRule<unknown, number>
}

export const number: NumberFactory = (message = numberMessage) =>
  rule<unknown, number>((value = '') => {
    try {
      const n = Number(value)
      if (Number.isFinite(n)) {
        return n
      }
    } catch {}
    throw new Error(message)
  })
