import { stringYobta } from '../stringYobta'
import { syncYobta } from '../syncYobta'
import { itemsYobta } from '.'
import { requiredYobta } from '../requiredYobta'
import { minCharactersYobta } from '../minCharactersYobta'
import { arrayYobta } from '../arrayYobta'
import { YobtaError } from '../YobtaError'

const validate = syncYobta(
  arrayYobta(),
  requiredYobta<any[]>(),
  itemsYobta(stringYobta(), requiredYobta<string>(), minCharactersYobta(5))
)

it('accepts empty array', () => {
  let result = validate([])
  expect(result).toEqual([[], null])
})

it('accepts array of strings', () => {
  let result = validate(['yobta'])
  expect(result).toEqual([['yobta'], null])
})

it('rejects all invalid items', () => {
  let result = validate([[], '', 'yobt', 'yobta'])
  expect(result).toEqual([
    null,
    [
      new YobtaError({
        field: '@root',
        message: 'It should be a string',
        path: [0]
      }),
      new YobtaError({
        field: '@root',
        message: 'Required',
        path: [1]
      }),
      new YobtaError({
        field: '@root',
        message: 'It should have at least 5 characters',
        path: [2]
      })
    ]
  ])
})
