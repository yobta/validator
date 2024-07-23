/* eslint-disable import/extensions */
import { createValidator } from '../createValidator/createValidator'
import { maxDateYobta } from './'

const maxDate = new Date('14 Jun 2017 00:00:00 PDT')
const customMessage = (limit: Date): string => `${limit.toUTCString()} yobta!`
const validate = createValidator(maxDateYobta(maxDate, customMessage))

it('accepts exact date', () => {
  const result = validate(maxDate)
  expect(result).toEqual(maxDate)
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
  const attempt = (): any => createValidator(maxDateYobta(maxDate))(longerDate)

  expect(attempt).toThrow('It should be within Wed, 14 Jun 2017 07:00:00 GMT')
})
