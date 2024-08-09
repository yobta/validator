import { fromEntries } from '../_internal/fromEntries/index.js'
import type { YobtaMaybe } from '../_types/YobtaMaybe.js'
import type { YobtaSyncRule } from '../rule/rule.js'
import { rule } from '../rule/rule.js'

export const formMessage = 'It should be HTMLFormElement or a form Event'

// TODO: move form-related logic to form createContext
// add support for accepting FormData as input
export const form = <I>(
  message: string = formMessage,
): YobtaSyncRule<I, YobtaMaybe<I, Record<string, unknown>>> =>
  rule((input, ctx) => {
    const node = ctx.form || input

    if (!node) {
      return undefined as YobtaMaybe<I, Record<string, unknown>>
    }

    if (node instanceof HTMLFormElement) {
      const output = new FormData(node)
      return fromEntries(output) as YobtaMaybe<I, Record<string, unknown>>
    }

    throw new Error(message)
  })
