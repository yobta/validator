import { ruleYobta, SyncRule } from '../ruleYobta'

interface ValidityYobtaFactory {
  <I>(validityMessage?: string): SyncRule<I, I>
}

interface Data {
  target: HTMLInputElement | HTMLFormElement
  currentTarget: HTMLFormElement
}

export const validityMessage = 'Validity expects a form event'

export const validityYobta: ValidityYobtaFactory = (
  invariantMessage = validityMessage,
) =>
  ruleYobta((input, { errors, data }) => {
    if (!(data?.currentTarget instanceof HTMLFormElement)) {
      throw new Error(invariantMessage)
    }

    let { target, currentTarget: form } = data as unknown as Data

    let filteredErrors =
      target !== form
        ? errors.filter(({ field }) => field === target.getAttribute('name'))
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
    return input
  })
