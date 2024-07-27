import { fromEntries } from '../_internal/fromEntries/index.js'
import type { YobtaSyncRule } from '../createRule/createRule.js'
import { createRule } from '../createRule/createRule.js'

export const formMessage = 'It should be HTMLFormElement or a form Event'

// TODO: move form-related logic to form createContext
// add support for accepting FormData as input
export const form = (
  message: string = formMessage,
): YobtaSyncRule<unknown, Record<string, unknown>> =>
  createRule((input, ctx) => {
    const node = ctx.form || input

    if (node instanceof HTMLFormElement) {
      const output = new FormData(node)
      return fromEntries(output)
    }

    throw new Error(message)
  })
