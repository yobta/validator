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

const isInputElement = (element: unknown): element is InputElement =>
  element instanceof HTMLInputElement ||
  element instanceof HTMLSelectElement ||
  element instanceof HTMLTextAreaElement

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
      for (const element of [...form.elements].flat().filter(isInputElement)) {
        updateValidity(element, '')
      }

      for (const error of [...errors].reverse()) {
        const namedElements = [form.elements.namedItem(error.field)]
          .flat()
          .filter(isInputElement)

        if (namedElements.length) {
          for (const element of namedElements) {
            updateValidity(element, error.message)
          }
        } else {
          onUnhandledError(error)
        }
      }
    } else if (input && !errors.some(({ field }) => field === input.name)) {
      updateValidity(input, '')
    }

    return currentData
  })
