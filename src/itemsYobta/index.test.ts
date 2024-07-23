/* eslint-disable import/extensions */
import { arrayYobta } from '../arrayYobta'
import { minCharactersYobta } from '../minCharactersYobta'
import { requiredYobta } from '../requiredYobta'
import { stringYobta } from '../stringYobta'
import { createValidator } from '../createValidator/createValidator'
import { itemsYobta } from './'

const validate = createValidator(
  arrayYobta(),
  requiredYobta(),
  itemsYobta(stringYobta(), requiredYobta(), minCharactersYobta(5)),
)

describe('itemsYobta', () => {
  it('accepts empty array', () => {
    const result = validate([])
    expect(result).toEqual([])
  })

  it('accepts array of strings', () => {
    const result = validate(['yobta'])
    expect(result).toEqual(['yobta'])
  })

  it('rejects empty array', () => {
    const result = (): any => validate([[]])
    expect(result).toThrow('It should be a string')
  })

  it('rejects array with empty string', () => {
    const result = (): any => validate([['']])
    expect(result).toThrow('It should be a string')
  })

  it('rejects array with invalid item', () => {
    const result = (): any => validate([['yobt']])
    expect(result).toThrow('It should be a string')
  })
})
