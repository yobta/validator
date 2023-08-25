/* eslint-disable import/extensions */
import { minDateYobta, minDateMessage } from './'
import { yobta } from '../yobta'

const minDate = new Date('14 Jun 2017 00:00:00 PDT')
const customMessage = (limit: Date): string => `${limit.toUTCString()} yobta!`
const validate = yobta(minDateYobta(minDate, customMessage))

it('accepts exact date', () => {
  let result = validate(minDate)
  expect(result).toEqual(minDate)
})

it('accepts longer date', () => {
  let longerDate = new Date('15 Jun 2017 00:00:00 PDT')
  let result = validate(longerDate)
  expect(result).toEqual(longerDate)
})

it('regects shorter date lenght', () => {
  let shorterDate = new Date('13 Jun 2017 00:00:00 PDT')
  let attempt = (): any => validate(shorterDate)
  expect(attempt).toThrow(customMessage(minDate))
})

it('has default error message', () => {
  let shorterDate = new Date('13 Jun 2017 00:00:00 PDT')
  let validateDefault = yobta(minDateYobta(minDate))
  let attempt = (): any => validateDefault(shorterDate)
  expect(attempt).toThrow(minDateMessage(minDate))
})

it('accepts error message as a string', () => {
  let shorterDate = new Date('13 Jun 2017 00:00:00 PDT')
  let validateDefault = yobta(
    minDateYobta(minDate, 'minDateYobta test error string'),
  )
  let attempt = (): any => validateDefault(shorterDate)
  expect(attempt).toThrow('minDateYobta test error string')
})
