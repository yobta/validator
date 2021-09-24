import { syncYobta } from '../syncYobta'
import { formDataYobta, formDataMessage } from '.'

const validate = syncYobta(formDataYobta())

it('accepts FormData instance', () => {
  let input = new FormData()
  input.append('key', 'yobta')
  let result = validate(input)
  expect(result).toEqual({ key: 'yobta' })
})

it('accepts form instance', () => {
  let input = document.createElement('form')
  let result = validate(input)
  expect(result).toEqual({})
})

it('accepts event', () => {
  let input = {
    currentTarget: document.createElement('form')
  }
  let result = validate(input)
  expect(result).toEqual({})
})

it('can be undefined', () => {
  let result = validate(undefined)
  expect(result).toBeUndefined()
})

it('rejects invalid input', () => {
  let attempt = (): any => validate([])
  expect(attempt).toThrow(formDataMessage)
})

it('has custom error messages', () => {
  let attempt = (): any => syncYobta(formDataYobta('yobta!'))(null)
  expect(attempt).toThrow('yobta!')
})
