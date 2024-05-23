import type { PlainObject } from '../_internal/fromEntries/index.js'
import { fromEntries } from '../_internal/fromEntries/index.js'
import type { SyncRule } from '../ruleYobta/index.js'
import { ruleYobta } from '../ruleYobta/index.js'

interface FormFactory {
  (message?: string): SyncRule<any, PlainObject | undefined>
}

export const formDataMessage = 'It should be HTMLFormElement or a form Event'

export const formYobta: FormFactory = (message = formDataMessage) =>
  ruleYobta((input, { form }) => {
    if (typeof input === 'undefined') {
      return input
    }

    const node = form || input

    if (node?.tagName === 'FORM') {
      // eslint-disable-next-line n/no-unsupported-features/node-builtins
      const output = new FormData(node)
      return fromEntries(output)
    }

    throw new Error(message)
  })
