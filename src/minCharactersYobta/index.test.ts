import { syncYobta } from '../syncYobta'
import { minCharactersYobta, minCharactersMessage } from './'

const customMessage = (limit: number): string => `${limit} yobta!`
const validate = syncYobta(minCharactersYobta(1, customMessage))

it('accepts exact lenght', () => {
  let result = validate('a')
  expect(result).toEqual(['a', null])
})

it('accepts greater lenght', () => {
  let result = validate('ab')
  expect(result).toEqual(['ab', null])
})

it('regects insufficient lenght', () => {
  let result = validate('')
  expect(result).toEqual([
    null,
    [{ field: '@root', message: customMessage(1), path: [] }]
  ])
})

it('has default error message', () => {
  let validateDefault = syncYobta(minCharactersYobta(1))
  let result = validateDefault('')
  expect(result).toEqual([
    null,
    [{ field: '@root', message: minCharactersMessage(1), path: [] }]
  ])
})
