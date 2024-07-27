import { fromEntries } from '../_internal/fromEntries/index.js'
import type { YobtaSyncRule } from '../rule/rule.js'
import { rule } from '../rule/rule.js'

export const formMessage = 'It should be HTMLFormElement or a form Event'

// TODO: move form-related logic to form createContext
// add support for accepting FormData as input
export const form = (
  message: string = formMessage,
): YobtaSyncRule<unknown, Record<string, unknown>> =>
  rule((input, ctx) => {
    const node = ctx.form || input

    if (node instanceof HTMLFormElement) {
      const output = new FormData(node)
      return fromEntries(output)
    }

    throw new Error(message)
  })
