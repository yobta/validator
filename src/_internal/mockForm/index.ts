import { createEvent } from '@testing-library/dom'

import type { YobtaAsyncResult } from '../../_types/YobtaAsyncResult'
import type { YobtaAsyncRule } from '../../_types/YobtaAsyncRule'

interface MockFormFactory {
  (innerHtml: string): {
    change<V>(validate: YobtaAsyncRule<unknown, V>): YobtaAsyncResult<V>
    submit<V>(validate: YobtaAsyncRule<unknown, V>): YobtaAsyncResult<V>
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
