import { ruleYobta, SyncRule } from '../ruleYobta'

let coercedTypes = new Set(['string', 'boolean', 'number', 'undefined'])

export const numberMessage = 'It should be a number'

interface NumberFactory {
  (message?: string): SyncRule<any, number>
}

export const numberYobta: NumberFactory = (message = numberMessage) =>
  ruleYobta(value => {
    if (coercedTypes.has(typeof value) || value === null) {
      let number = Number(value)
      return Number.isFinite(number) ? number : NaN
    }

    throw new Error(message)
  })
