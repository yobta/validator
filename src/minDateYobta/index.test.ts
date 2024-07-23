/* eslint-disable import/extensions */
import { createValidator } from '../createValidator/createValidator'
import { minDateMessage, minDateYobta } from './'

const minDate = new Date('14 Jun 2017 00:00:00 PDT')
const customMessage = (limit: Date): string => `${limit.toUTCString()} yobta!`
const validate = createValidator(minDateYobta(minDate, customMessage))

it('accepts exact date', () => {
  const result = validate(minDate)
  expect(result).toEqual(minDate)
})

it('accepts longer date', () => {
  const longerDate = new Date('15 Jun 2017 00:00:00 PDT')
  const result = validate(longerDate)
  expect(result).toEqual(longerDate)
})

it('regects shorter date lenght', () => {
  const shorterDate = new Date('13 Jun 2017 00:00:00 PDT')
  const attempt = (): any => validate(shorterDate)
  expect(attempt).toThrow(customMessage(minDate))
})

it('has default error message', () => {
  const shorterDate = new Date('13 Jun 2017 00:00:00 PDT')
  const validateDefault = createValidator(minDateYobta(minDate))
  const attempt = (): any => validateDefault(shorterDate)
  expect(attempt).toThrow(minDateMessage(minDate))
})
