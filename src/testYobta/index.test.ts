import { syncYobta } from '../syncYobta'
import { YobtaError } from '../YobtaError'
import { testYobta, testMessage } from './'

const regExp = /fo*/

const customMessage = 'yobta!'
const validate = syncYobta(testYobta(regExp, customMessage))

it('accepts if mathed', () => {
  let result = validate('table football')
  expect(result).toEqual(['table football', null])
})

it('accepts undefined', () => {
  let result = validate(undefined)
  expect(result).toEqual([undefined, null])
})

it('regects if not matched', () => {
  let result = validate('yobta')
  expect(result).toEqual([
    null,
    [new YobtaError({ field: '@root', message: customMessage, path: [] })]
  ])
})

it('has default error message', () => {
  let validateDefault = syncYobta(testYobta(regExp))
  let result = validateDefault('yobta')
  expect(result).toEqual([
    null,
    [new YobtaError({ field: '@root', message: testMessage, path: [] })]
  ])
})
