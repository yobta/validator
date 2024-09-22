/* eslint-disable import/extensions */
import { createValidator } from '../createValidator/createValidator'
import { minDate, minDateMessage } from './minDate'

const date = new Date('14 Jun 2017 00:00:00 PDT')
const customMessage = (limit: Date): string => `${limit.toUTCString()} yobta!`
const validate = createValidator(minDate(() => date, customMessage))

it('accepts exact date', () => {
  const result = validate(date)
  expect(result).toEqual(date)
})

it('accepts longer date', () => {
  const longerDate = new Date('15 Jun 2017 00:00:00 PDT')
  const result = validate(longerDate)
  expect(result).toEqual(longerDate)
})

it('regects shorter date lenght', () => {
  const shorterDate = new Date('13 Jun 2017 00:00:00 PDT')
  const attempt = (): any => validate(shorterDate)
  expect(attempt).toThrow(customMessage(date))
})

it('has default error message', () => {
  const shorterDate = new Date('13 Jun 2017 00:00:00 PDT')
  const validateDefault = createValidator(minDate(() => date))
  const attempt = (): any => validateDefault(shorterDate)
  expect(attempt).toThrow(minDateMessage(date))
})

it('accepts undefined', () => {
  const result = validate(undefined)
  expect(result).toBeUndefined()
})
