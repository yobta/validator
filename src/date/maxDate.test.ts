/* eslint-disable import/extensions */
import { createValidator } from '../createValidator/createValidator'
import { date } from './date'
import { maxDate } from './maxDate'

const limit = new Date('14 Jun 2017 00:00:00 PDT')
const customMessage = (max: Date): string => `${max.toUTCString()} yobta!`

const validate = createValidator(date(), maxDate(limit, customMessage))

it('accepts exact date', () => {
  const result = validate(limit)
  expect(result).toEqual(limit)
})

it('accepts shorter date', () => {
  const shorterDate = new Date('13 Jun 2017 00:00:00 PDT')
  const result = validate(shorterDate)
  expect(result).toEqual(shorterDate)
})

it('regects longer date lenght', () => {
  const longerDate = new Date('15 Jun 2017 00:00:00 PDT')
  const attemt = (): any => validate(longerDate)
  expect(attemt).toThrow('Wed, 14 Jun 2017 07:00:00 GMT yobta!')
})

it('has default error message', () => {
  const longerDate = new Date('15 Jun 2017 00:00:00 PDT')
  const attempt = (): any => createValidator(maxDate(limit))(longerDate)

  expect(attempt).toThrow('It should be within Wed, 14 Jun 2017 07:00:00 GMT')
})

it('accepts undefined', () => {
  const result = validate(undefined)
  expect(result).toBeUndefined()
})
