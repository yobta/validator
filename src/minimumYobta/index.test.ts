import { syncYobta } from '../syncYobta'
import { YobtaError } from '../YobtaError'
import { minimumYobta, minimumYobtaMessage } from './'

const customMessage = (limit: number): string => `${limit} yobta!`
const validate = syncYobta(minimumYobta(1, customMessage))

it('accepts exact lenght', () => {
  let result = validate(1)
  expect(result).toEqual([1, null])
})

it('accepts greater lenght', () => {
  let result = validate(2)
  expect(result).toEqual([2, null])
})

it('regects insufficient lenght', () => {
  let result = validate(0)
  expect(result).toEqual([
    null,
    [new YobtaError({ field: '@root', message: customMessage(1), path: [] })]
  ])
})

it('has default error message', () => {
  let validateDefault = syncYobta(minimumYobta(1))
  let result = validateDefault(0)
  expect(result).toEqual([
    null,
    [
      new YobtaError({
        field: '@root',
        message: minimumYobtaMessage(1),
        path: []
      })
    ]
  ])
})
