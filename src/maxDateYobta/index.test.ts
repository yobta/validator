/* eslint-disable import/extensions */
import { yobta } from '../yobta'
import { maxDateYobta } from './'

const maxDate = new Date('14 Jun 2017 00:00:00 PDT')
const customMessage = (limit: Date): string => `${limit.toUTCString()} yobta!`
const validate = yobta(maxDateYobta(maxDate, customMessage))

it('accepts exact date', () => {
  let result = validate(maxDate)
  expect(result).toEqual(maxDate)
})

it('accepts shorter date', () => {
  let shorterDate = new Date('13 Jun 2017 00:00:00 PDT')
  let result = validate(shorterDate)
  expect(result).toEqual(shorterDate)
})

it('regects longer date lenght', () => {
  let longerDate = new Date('15 Jun 2017 00:00:00 PDT')
  let attemt = (): any => validate(longerDate)
  expect(attemt).toThrow('Wed, 14 Jun 2017 07:00:00 GMT yobta!')
})

it('has default error message', () => {
  let longerDate = new Date('15 Jun 2017 00:00:00 PDT')
  let attempt = (): any => yobta(maxDateYobta(maxDate))(longerDate)

  expect(attempt).toThrow('It should be within Wed, 14 Jun 2017 07:00:00 GMT')
})
