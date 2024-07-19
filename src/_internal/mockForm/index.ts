import { createEvent } from '@testing-library/dom'

import type { AsyncResultYobta, AsyncRuleYobta } from '../../index.js'

interface MockFormFactory {
  (innerHtml: string): {
    change<V>(validate: AsyncRuleYobta<unknown, V>): AsyncResultYobta<V>
    submit<V>(validate: AsyncRuleYobta<unknown, V>): AsyncResultYobta<V>
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
