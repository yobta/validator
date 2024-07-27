import type { YobtaSyncRule } from '../createRule/createRule.js'
import { createRule } from '../createRule/createRule.js'

interface StringFactory {
  (message?: string): YobtaSyncRule<unknown, string>
}

const coercedTypes = new Set(['number', 'boolean', 'string'])

export const stringMessage = 'It should be a string'

export const string: StringFactory = (message = stringMessage) =>
  createRule<unknown, string>((value = '') => {
    if (value instanceof String || coercedTypes.has(typeof value)) {
      return String(value).trim()
    }

    throw new Error(message)
  })

// todo rewrite to:

// import type { YobtaSyncRule } from '../createRule/index.js'
// import { createRule } from '../createRule/index.js'

// interface StringFactory {
//   (message?: string): YobtaSyncRule<unknown, string>
// }

// export const stringMessage = 'It should be a string'

// export const string: StringFactory = (message = stringMessage) =>
//   createRule<unknown, string>((value = '') => {
//     const n = Number(value)
//     if (Number.isFinite(n)) {
//       return String(value).trim()
//     }

//     throw new Error(message)
//   })
