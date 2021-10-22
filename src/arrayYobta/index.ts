import { ruleYobta, SyncRule } from '../ruleYobta'
import { isVoid } from '../_internal/isVoid'

// const iterables = new Set(['number', 'string'])

export const arrayYobta = (): SyncRule<any, any[]> =>
  ruleYobta(input => {
    if (isVoid(input)) {
      return []
    }
    if (typeof input === 'string') {
      return [input]
    }
    if (Array.isArray(input)) {
      return input
    }
    let array = Array.from(input)
    if (array.length) {
      return array
    }

    return [input]
  })
