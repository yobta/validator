import { createRule } from '../createRule/index.js'
import { isPlainObject } from '../isPlainObject/index.js'
import { pipe } from '../pipe/index.js'

export const plainObjectTypeMessage = 'Should be a plain object'

export const plainObjectType = (rulesSet, message = plainObjectTypeMessage) =>
  createRule((input, context) => {
    if (!isPlainObject(input)) throw new Error(message)
    return Object.entries(rulesSet).reduce((acc, [field, rules]) => {
      let path = [...context.path, field]
      let tests = rules.map(rule =>
        rule({
          ...context,
          field,
          path
        })
      )
      let prev = input[field]
      let next
      try {
        next = pipe(...tests)(prev)
      } catch (error) {
        context.pushError({ message: error.message, field, path })
        next = error
      }
      return { ...acc, [field]: next }
    }, {})
  })
