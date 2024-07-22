/* eslint-disable import/extensions */
import { numberYobta } from '../numberYobta'
import { yobta } from '../yobta'
import { minimumYobta, minimumYobtaMessage } from './'

const customMessage = (limit: number): string => `${limit} yobta!`
const validate = yobta(numberYobta(), minimumYobta(1, customMessage))

it('accepts exact lenght', () => {
  const result = validate(1)
  expect(result).toBe(1)
})

it('accepts greater lenght', () => {
  const result = validate(2)
  expect(result).toBe(2)
})

it('regects insufficient lenght', () => {
  const assign = (): any => validate(0)
  expect(assign).toThrow(customMessage(1))
})

it('has default error message', () => {
  const validateDefault = yobta(numberYobta(), minimumYobta(1))
  const assign = (): any => validateDefault(0)
  expect(assign).toThrow(minimumYobtaMessage(1))
})
