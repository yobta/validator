import { pipe } from '../pipe/index.js'

const field = '@root'

export const syncYobta =
  (...rules) =>
  input => {
    let errors = []
    let context = {
      async: false,
      field,
      path: [],
      pushError(error) {
        errors.push(error)
      }
    }

    let result

    let nextRules = rules.map(next => next(context))

    try {
      result = pipe(...nextRules)(input)
    } catch (error) {
      context.pushError({ field, message: error.message, path: [] })
    }

    return errors.length ? [null, errors] : [result, null]
  }
