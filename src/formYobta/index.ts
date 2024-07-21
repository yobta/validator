import type { PlainObject } from '../_internal/fromEntries/index.js'
import { fromEntries } from '../_internal/fromEntries/index.js'
import type { YobtaSyncRule } from '../ruleYobta/index.js'
import { ruleYobta } from '../ruleYobta/index.js'

interface FormFactory {
  (message?: string): YobtaSyncRule<unknown, PlainObject>
}

export const formDataMessage = 'It should be HTMLFormElement or a form Event'

export const formYobta: FormFactory = (message = formDataMessage) =>
  ruleYobta((input, { form }) => {
    const node = form || input

    if (node instanceof HTMLFormElement) {
      const output = new FormData(node)
      return fromEntries(output)
    }

    throw new Error(message)
  })
