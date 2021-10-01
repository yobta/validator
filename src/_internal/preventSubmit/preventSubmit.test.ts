import { jest } from '@jest/globals'

import { preventSubmit } from './preventSubmit'

it('prevents submit event', () => {
  let event = new Event('submit')
  jest.spyOn(event, 'preventDefault')

  preventSubmit(event)

  expect(event.preventDefault).toHaveBeenCalledTimes(1)
})

it('prevents synthetic submit event', () => {
  let event = {
    type: 'submit',
    constructor: { name: 'SyntheticBaseEvent' },
    preventDefault() {},
  }
  jest.spyOn(event, 'preventDefault')

  preventSubmit(event)

  expect(event.preventDefault).toHaveBeenCalledTimes(1)
})
