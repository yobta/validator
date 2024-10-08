import type { YobtaSyncRule } from '../rule/rule.js'
import { rule } from '../rule/rule.js'
import type { YobtaError } from '../YobtaError/index.js'

type YontaErrorHandler = (error: YobtaError) => void

type InputElement = HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement

const isInputElement = (element: Element): element is InputElement =>
  Boolean('setCustomValidity' in element && 'reportValidity' in element)

const updateValidity = (element: InputElement, message: string = ''): void => {
  element.setCustomValidity(message)
  element.reportValidity()
}

export const validity = <I>(
  onUnhandledError: YontaErrorHandler,
  { validateAllFieldsOnChange = false } = {},
): YobtaSyncRule<I, I> =>
  rule((currentData: I, { errors, event, form, input }) => {
    const mappedErrors = new Map<string, YobtaError>()

    for (const error of errors) {
      mappedErrors.set(error.field, error)
    }

    if (form) {
      const shouldReport: boolean =
        (event as Event | undefined)?.type === 'submit' ||
        validateAllFieldsOnChange

      if (shouldReport) {
        const reversedElements = [...form.elements]
          .flat()
          .filter(isInputElement)
          .reverse()

        for (const element of reversedElements) {
          if (
            !(element as HTMLInputElement).readOnly &&
            element.type !== 'hidden'
          ) {
            const error = mappedErrors.get(element.name)
            updateValidity(element, error?.message || '')
            mappedErrors.delete(element.name)
          }
        }

        for (const [, error] of mappedErrors) {
          onUnhandledError(error)
        }
      } else if (input && !errors.some(({ field }) => field === input.name)) {
        updateValidity(input, '')
      }
    } else {
      for (const [, error] of mappedErrors) {
        onUnhandledError(error)
      }
    }

    return currentData
  })
