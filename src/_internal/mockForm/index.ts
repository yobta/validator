import { createEvent } from '@testing-library/dom'

import type { AsyncYobtaRule } from '../../index.js'

interface MockFormFactory {
  (innerHtml: string): {
    change<V extends AsyncYobtaRule<any, any>>(
      validate: V,
    ): Promise<ReturnType<V>>
    submit<V extends AsyncYobtaRule<any, any>>(
      validate: V,
    ): Promise<ReturnType<V>>
  }
}

export const mockForm: MockFormFactory = innerHtml => {
  return {
    change(validate) {
      const form = document.createElement('form')
      form.innerHTML = innerHtml
      const event = createEvent.change(form)
      Object.defineProperty(event, 'currentTarget', { value: form })

      return validate(event)
    },
    submit(validate) {
      const form = document.createElement('form')
      form.innerHTML = innerHtml
      const event = createEvent.submit(form)
      Object.defineProperty(event, 'currentTarget', { value: form })

      return validate(event)
    },
  }
}
