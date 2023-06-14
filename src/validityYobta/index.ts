import { ruleYobta, SyncRule } from '../ruleYobta/index.js'

const submitOnly = 'submit-only'
const all = 'all'

type ValidityMode = typeof submitOnly | typeof all
interface ValidityFactory {
  <I>(props?: { missingFormMessage?: string; mode?: ValidityMode }): SyncRule<
    I,
    I
  >
}

export const validityMessage = 'Validity expects a form event'

export const validityYobta: ValidityFactory = ({
  missingFormMessage: invariantMessage = validityMessage,
  mode = submitOnly,
} = {}) =>
  ruleYobta((currentData, { errors, form, input }) => {
    if (!form) {
      throw new Error(invariantMessage)
    }

    if ((mode === submitOnly && input?.type === 'submit') || mode === all) {
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
    }

    return currentData
  })
