import { fromEntries } from '../_internal/fromEntries/index.js'
import type { YobtaSyncRule } from '../rule/rule.js'
import { rule } from '../rule/rule.js'

export const formMessage = 'It should be HTMLFormElement or a form Event'

export const form = <I>(
  message: string = formMessage,
): YobtaSyncRule<I, Record<string, unknown>> =>
  rule((value, ctx) => {
    if (value && (value as any).target) {
      const { target } = value as any

      const formNode = target.closest('form') as HTMLFormElement | null

      if (formNode) {
        ctx.form = formNode
      }

      // NOTE: instanceof would not work for custom elements here:
      if (formNode && target !== formNode) {
        ctx.input = target as HTMLInputElement
      }
    }

    if (value instanceof HTMLFormElement) {
      ctx.form = value
    }

    if (ctx.form) {
      // eslint-disable-next-line n/no-unsupported-features/node-builtins
      const output = new FormData(ctx.form)
      return fromEntries(output) as Record<string, unknown>
    }

    throw new Error(message)
  })
