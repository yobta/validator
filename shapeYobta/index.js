import { createRule } from '../createRule/index.js'
import { isPlainObject } from '../isPlainObject/index.js'
import { pipe } from '../pipe/index.js'

export const shapeMessage = 'Should be a plain object'

export const shapeYobta = (rulesSet, message = shapeMessage) =>
  createRule((input, context) => {
    if (!isPlainObject(input) && typeof input !== 'undefined')
      {throw new Error(message)}
    return (
      input &&
      Object.entries(rulesSet).reduce((acc, [field, rules]) => {
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
    )
  })
