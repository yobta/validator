import type { SyncRule } from '../ruleYobta/index.js'
import { ruleYobta } from '../ruleYobta/index.js'
import type { YobtaError } from '../YobtaError/index.js'

type YontaErrorHandler = (error: YobtaError) => void

interface ValidityFactory {
  <I>(
    onUnhandledError: YontaErrorHandler,
    props?: {
      missingFormMessage?: string
      validateAllFieldsOnChange?: boolean
    },
  ): SyncRule<I, I>
}

export const validityMessage = 'Validity expects a form event'

type InputElement = HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement

const isInputElement = (element: Element): element is InputElement =>
  Boolean('setCustomValidity' in element && 'reportValidity' in element)

const updateValidity = (element: InputElement, message: string = ''): void => {
  element.setCustomValidity(message)
  element.reportValidity()
}

export const validityYobta: ValidityFactory = (
  onUnhandledError,
  {
    missingFormMessage = validityMessage,
    validateAllFieldsOnChange = false,
  } = {},
) =>
  ruleYobta((currentData, { errors, event, form, input }) => {
    if (!form) {
      throw new Error(missingFormMessage)
    }

    const shouldReport: boolean =
      event.type === 'submit' || validateAllFieldsOnChange

    if (shouldReport) {
      const reversedElements = [...form.elements]
        .flat()
        .filter(isInputElement)
        .reverse()

      const mappedErrors = new Map<string, YobtaError>()

      for (const error of errors) {
        mappedErrors.set(error.field, error)
      }

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

    return currentData
  })
