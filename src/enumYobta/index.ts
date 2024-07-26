import type { YobtaSyncRule } from '../ruleYobta/index.js'
import { ruleYobta } from '../ruleYobta/index.js'

export type EnumMessage<T> = (items: Set<T>) => string

export const enumMessage: EnumMessage<unknown> = items =>
  `It should be one of: ${items}`

export const enumYobta = <T>(
  items: Set<T>,
  message: EnumMessage<T> = enumMessage,
): YobtaSyncRule<any, T> =>
  ruleYobta((input: T) => {
    if (items.has(input)) {
      return input
    }
    throw new Error(message(items))
  })
