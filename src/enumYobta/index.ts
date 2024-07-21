import type { YobtaSyncRule } from '../ruleYobta/index.js'
import { ruleYobta } from '../ruleYobta/index.js'

interface EnumMessage {
  <T>(items: Set<T>): string
}

interface EnymYobta {
  <T>(items: Set<T>, message?: EnumMessage): YobtaSyncRule<any, T[]>
}

export const enumMessage: EnumMessage = items => `It should be one of: ${items}`

export const enumYobta: EnymYobta = (items, message = enumMessage) =>
  ruleYobta(input => {
    if (items.has(input)) {
      return input
    }
    throw new Error(message(items))
  })
