import { ruleYobta, SyncRule } from '../ruleYobta'

let coercedTypes = new Set(['string', 'boolean', 'number'])

export const numberMessage = 'It should be a number'

interface NumberFactory {
  (message?: string): SyncRule<any, number>
}

export const numberYobta: NumberFactory = (message = numberMessage) =>
  ruleYobta(value => {
    if (value === null) {
      return 0
    }
    if (typeof value === 'undefined') {
      return NaN
    }
    if (typeof value === 'string') {
      value = value.replace(/\s+/g, '')
    }
    if (coercedTypes.has(typeof value)) {
      let number = Number(value)
      if (Number.isFinite(number)) {
        return number
      }
    }

    throw new Error(message)
  })
