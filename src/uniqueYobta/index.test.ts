import { syncYobta } from '../syncYobta'
import { requiredYobta } from '../requiredYobta'
import { arrayYobta } from '../arrayYobta'
import { uniqueYobta, uniqueMessage } from '.'

const customMesage = 'yobta'

const validate = syncYobta(
  arrayYobta(),
  requiredYobta<any[]>(),
  uniqueYobta(customMesage)
)

it('accepts empty array', () => {
  let result = validate([])
  expect(result).toEqual([[], null])
})

it('accepts array of strings', () => {
  let result = validate([1, 2, 3, '', ' '])
  expect(result).toEqual([[1, 2, 3, '', ' '], null])
})

it('rejects duplicate items', () => {
  let result = validate([1, 2, 2])
  expect(result).toEqual([
    null,
    [
      {
        field: '@root',
        message: customMesage,
        path: []
      }
    ]
  ])
})

it('has default error message', () => {
  let validateDefault = syncYobta(
    arrayYobta(),
    requiredYobta<any[]>(),
    uniqueYobta()
  )
  let result = validateDefault(['', '2', '2'])
  expect(result).toEqual([
    null,
    [
      {
        field: '@root',
        message: uniqueMessage,
        path: []
      }
    ]
  ])
})
