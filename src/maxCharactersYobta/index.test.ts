import { syncYobta } from '../syncYobta'
import { maxCharactersYobta, maxCharactersMessage } from './'

const customMessage = (limit: number): string => `${limit} yobta!`
const validate = syncYobta(maxCharactersYobta(1, customMessage))

it('accepts exact lenght', () => {
  let result = validate('a')
  expect(result).toEqual(['a', null])
})

it('accepts smaller lenght', () => {
  let result = validate('')
  expect(result).toEqual(['', null])
})

it('regects greater lenght', () => {
  let result = validate('ab')
  expect(result).toEqual([
    null,
    [{ field: '@root', message: customMessage(1), path: [] }]
  ])
})

it('has default error message', () => {
  let validateDefault = syncYobta(maxCharactersYobta(1))
  let result = validateDefault('ab')
  expect(result).toEqual([
    null,
    [{ field: '@root', message: maxCharactersMessage(1), path: [] }]
  ])
})
