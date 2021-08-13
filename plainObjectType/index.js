import { createRule } from '../createRule/index.js'
import { isPlainObject } from '../isPlainObject/index.js'
import { pipe } from '../pipe/index.js'

export const plainObjectTypeMessage = 'Should be a plain object'

export const plainObjectType = (rulesSet, message = plainObjectTypeMessage) =>
  createRule(input => {
    if (!isPlainObject(input)) throw new Error(message)
    return Object.entries(rulesSet).reduce((acc, [key, rules]) => {
      let prev = input[key]
      // let next = rules[0](prev)
      let next = pipe(...rules)(prev)
      // console.log('next: ', next);
      return { ...acc, [key]: next }
    }, {})
  })
