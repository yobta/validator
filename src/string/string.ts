import type { YobtaSyncRule } from '../ruleYobta/index.js'
import { ruleYobta } from '../ruleYobta/index.js'

interface StringFactory {
  (message?: string): YobtaSyncRule<unknown, string>
}

const coercedTypes = new Set(['number', 'boolean', 'string'])

export const stringMessage = 'It should be a string'

export const string: StringFactory = (message = stringMessage) =>
  ruleYobta<unknown, string>((value = '') => {
    if (value instanceof String || coercedTypes.has(typeof value)) {
      return String(value).trim()
    }

    throw new Error(message)
  })

// todo rewrite to:

// import type { YobtaSyncRule } from '../ruleYobta/index.js'
// import { ruleYobta } from '../ruleYobta/index.js'

// interface StringFactory {
//   (message?: string): YobtaSyncRule<unknown, string>
// }

// export const stringMessage = 'It should be a string'

// export const string: StringFactory = (message = stringMessage) =>
//   ruleYobta<unknown, string>((value = '') => {
//     const n = Number(value)
//     if (Number.isFinite(n)) {
//       return String(value).trim()
//     }

//     throw new Error(message)
//   })
