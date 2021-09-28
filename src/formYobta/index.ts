import { ruleYobta, SyncRule } from '../ruleYobta'
import { fromEntries, PlainObject } from '../_internal/fromEntries'

interface FormFactory {
  (message?: string): SyncRule<any, PlainObject | undefined>
}

export const formDataMessage = 'It should be HTMLFormElement or a form Event'

export const formYobta: FormFactory = (message = formDataMessage) =>
  ruleYobta(input => {
    let output: FormData | null = input instanceof FormData ? input : null
    if (typeof input === 'undefined') {
      return input
    }
    let element = input?.currentTarget || input
    if (element instanceof HTMLFormElement) {
      output = new FormData(element)
      return fromEntries(output)
    }
    throw new Error(message)
  })
