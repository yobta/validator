import type { YobtaOptionalSyncRule } from '../_types/YobtaOptionalSyncRule.js'
import { ruleYobta } from '../ruleYobta/index.js'

type TrustedItems = (number | string | symbol)[]

interface EnumMessage {
  (items: TrustedItems): string
}

interface EnymYobta {
  <T extends TrustedItems>(
    items: T,
    message?: EnumMessage,
  ): YobtaOptionalSyncRule<any, T[number]>
}

export const enumMessage: EnumMessage = items =>
  `It should be one of: ${items.join(', ')}`

export const enumYobta: EnymYobta = (items, message = enumMessage) =>
  ruleYobta(input => {
    if (items.includes(input) || input === undefined) {
      return input
    }
    throw new Error(message(items))
  })
