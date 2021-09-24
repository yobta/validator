import { createRule, SyncRule } from '../createRule'
import { fromEntries, PlainObject } from '../fromEntries'

interface FormDataRule {
  (message?: string): SyncRule<any, PlainObject | undefined>
}

export const formDataMessage =
  'It should be HTMLFormElement, FormData or an Event'

export const formDataYobta: FormDataRule = (message = formDataMessage) =>
  createRule(input => {
    let output: FormData | null = input instanceof FormData ? input : null
    if (typeof input === 'undefined') {
      return input
    }
    if (input instanceof FormData) {
      output = input
    }
    if (input?.currentTarget instanceof HTMLFormElement) {
      output = new FormData(input.currentTarget)
    }
    if (input instanceof HTMLFormElement) {
      output = new FormData(input)
    }
    if (output) {
      return fromEntries(output)
    }
    throw new Error(message)
  })
