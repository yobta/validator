import { createRule, Rule } from '../createRule'

type TrustedItems = (string | number | symbol)[]

export const oneOfMessage = (items: TrustedItems): string =>
  `It should be one of: ${items.join(', ')}`

export const oneOfYobta = <T extends TrustedItems>(
  items: T,
  message = oneOfMessage
): Rule<any, T[number]> =>
  createRule(input => {
    if (items.includes(input)) return input
    throw new Error(message(items))
  })
