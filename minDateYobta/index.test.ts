import { syncYobta } from '../syncYobta/index.js'
import { minDateYobta, minDateMessage } from './index.js'

const minDate = new Date('14 Jun 2017 00:00:00 PDT')
const customMessage = (limit: Date): string => `${limit.toUTCString()} yobta!`
const validate = syncYobta(minDateYobta(minDate, customMessage))

it('accepts exact date', () => {
  let result = validate(minDate)
  expect(result).toEqual([minDate, null])
})

it('accepts longer date', () => {
  let longerDate = new Date('15 Jun 2017 00:00:00 PDT')
  let result = validate(longerDate)
  expect(result).toEqual([longerDate, null])
})

it('regects shorter date lenght', () => {
  let shorterDate = new Date('13 Jun 2017 00:00:00 PDT')
  let result = validate(shorterDate)
  expect(result).toEqual([
    null,
    [{ field: '@root', message: customMessage(minDate), path: [] }]
  ])
})

it('has default error message', () => {
  let shorterDate = new Date('13 Jun 2017 00:00:00 PDT')

  let validateDefault = syncYobta(minDateYobta(minDate))
  let result = validateDefault(shorterDate)
  expect(result).toEqual([
    null,
    [{ field: '@root', message: minDateMessage(minDate), path: [] }]
  ])
})
