import type { YobtaSyncRule } from '../createRule/createRule.js'
import { createRule } from '../createRule/createRule.js'

export const numberMessage = 'It should be a number'

interface NumberFactory {
  (message?: string): YobtaSyncRule<unknown, number>
}

export const number: NumberFactory = (message = numberMessage) =>
  createRule<unknown, number>(value => {
    try {
      const n = Number(value ?? 0)
      if (Number.isFinite(n)) {
        return n
      }
    } catch {}
    throw new Error(message)
  })
