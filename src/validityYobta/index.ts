import { ruleYobta, SyncRule } from '../ruleYobta/index.js'

interface ValidityFactory {
  <I>(validityMessage?: string): SyncRule<I, I>
}

export const validityMessage = 'Validity expects a form event'

export const validityYobta: ValidityFactory = (
  invariantMessage = validityMessage,
) =>
  ruleYobta((currentData, { errors, form, input }) => {
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
      element.setCustomValidity(message)
      element.reportValidity()
    }

    return currentData
  })
