import { ruleYobta, SyncRule } from '../ruleYobta'

interface ValidityYobtaFactory {
  <I>(validityMessage?: string): SyncRule<I, I>
}

export const validityMessage = 'Validity expects a form event'

export const validityYobta: ValidityYobtaFactory = (
  invariantMessage = validityMessage,
) =>
  ruleYobta((currentData, { errors, form, input }) => {
    if (!form) {
      throw new Error(invariantMessage)
    }

    let filteredErrors = input
      ? errors.filter(({ field }) => field === input.getAttribute('name'))
      : errors

    let messages = filteredErrors.reduce<Record<string, string>>(
      (acc, { field, message }) => ({
        ...acc,
        [field]: message,
      }),
      {},
    )

    for (let element of form.elements) {
      let name = element.getAttribute('name') || ''
      let message = messages[name] || ''
      // @ts-ignore
      element.setCustomValidity(message)
    }

    form.reportValidity()
    return currentData
  })
