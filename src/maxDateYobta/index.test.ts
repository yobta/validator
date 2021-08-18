import { syncYobta } from '../syncYobta'
import { maxDateYobta, maxDateMessage } from './'

const maxDate = new Date('14 Jun 2017 00:00:00 PDT')
const customMessage = (limit: Date): string => `${limit.toUTCString()} yobta!`
const validate = syncYobta(maxDateYobta(maxDate, customMessage))

it('accepts exact date', () => {
  let result = validate(maxDate)
  expect(result).toEqual([maxDate, null])
})

it('accepts shorter date', () => {
  let shorterDate = new Date('13 Jun 2017 00:00:00 PDT')
  let result = validate(shorterDate)
  expect(result).toEqual([shorterDate, null])
})

it('regects longer date lenght', () => {
  let longerDate = new Date('15 Jun 2017 00:00:00 PDT')
  let result = validate(longerDate)
  expect(result).toEqual([
    null,
    [{ field: '@root', message: customMessage(maxDate), path: [] }]
  ])
})

it('has default error message', () => {
  let longerDate = new Date('15 Jun 2017 00:00:00 PDT')

  let validateDefault = syncYobta(maxDateYobta(maxDate))
  let result = validateDefault(longerDate)
  expect(result).toEqual([
    null,
    [{ field: '@root', message: maxDateMessage(maxDate), path: [] }]
  ])
})
