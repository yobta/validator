import { ruleYobta, SyncRule } from '../ruleYobta'
import { fromEntries, PlainObject } from '../_internal/fromEntries'

interface FormFactory {
  (message?: string): SyncRule<any, PlainObject | undefined>
}

export const formDataMessage = 'It should be HTMLFormElement or a form Event'

export const formYobta: FormFactory = (message = formDataMessage) =>
  ruleYobta((input, { form }) => {
    if (typeof input === 'undefined') {
      return input
    }

    let node = form || input

    if (node?.tagName === 'FORM') {
      let output = new FormData(node)
      return fromEntries(output)
    }

    throw new Error(message)
  })
