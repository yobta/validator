import { ruleYobta, SyncRule } from '../ruleYobta'

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

    let filteredErrors = filterBy
      ? errors.filter(({ field }) => field === filterBy)
      : errors

    let messages = filteredErrors.reduce<Record<string, string>>(
      (acc, { field, message }) => ({
        ...acc,
        [field]: message,
      }),
      {},
    )

    for (let element of form.elements as unknown as HTMLInputElement[]) {
      let name = element.getAttribute('name') || ''
      if (!filterBy || filterBy === name) {
        let message = messages[name] || ''
        element.setCustomValidity(message)
        if (!message) {
          element.reportValidity()
        }
      }
    }

    if (filteredErrors.length) {
      form.reportValidity()
    }

    return currentData
  })
