import type { SyncRule } from '../ruleYobta/index.js'
import { ruleYobta } from '../ruleYobta/index.js'

const submitOnly = 'submit-only'
const all = 'all'

type ValidityMode = typeof all | typeof submitOnly
interface ValidityFactory {
  <I>(props?: {
    missingFormMessage?: string
    mode?: ValidityMode
  }): SyncRule<I, I>
}

export const validityMessage = 'Validity expects a form event'

export const validityYobta: ValidityFactory = ({
  missingFormMessage: invariantMessage = validityMessage,
  mode = submitOnly,
} = {}) =>
  ruleYobta((currentData, { errors, event, form, input }) => {
    if (!form) {
      throw new Error(invariantMessage)
    }

    let filterBy = input?.getAttribute('name')
    let elements = Array.from(form.elements)

    if (filterBy) {
      let filteredElements = elements.filter(
        element => element.getAttribute('name') === filterBy,
      )
      if (filteredElements.length) {
        elements = filteredElements
      }
    }

    let messages = errors.reduce<Record<string, string>>(
      (acc, { field, message }) => ({
        ...acc,
        [field]: message,
      }),
      {},
    )

    for (let element of elements.reverse() as unknown as HTMLInputElement[]) {
      let name = element.getAttribute('name') || ''
      let message = messages[name] || ''
      let shouldReport = message
        ? (mode === submitOnly && event?.type === 'submit') || mode === all
        : true
      if (shouldReport) {
        element.setCustomValidity(message)
        element.reportValidity()
      }
    }

    return currentData
  })
