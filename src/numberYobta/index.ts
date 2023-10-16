import { ruleYobta, SyncRule } from '../ruleYobta/index.js'

let coercedTypes = new Set(['string', 'boolean', 'number'])

export const numberMessage = 'It should be a number'

interface NumberFactory {
  (message?: string): SyncRule<unknown, number | undefined>
}

export const numberYobta: NumberFactory = (message = numberMessage) =>
  ruleYobta(value => {
    if (value === null) {
      return 0
    }
    if (typeof value === 'undefined') {
      return undefined
    }
    if (typeof value === 'string') {
      value = value.replace(/\s+/g, '')
      // @ts-ignore
      if (!value.length) {
        return undefined
      }
    }
    if (coercedTypes.has(typeof value)) {
      let number = Number(value)
      if (Number.isFinite(number)) {
        return number
      }
    }

    throw new Error(message)
  })
