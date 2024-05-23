/* eslint-disable import/extensions */
import { arrayYobta } from '../arrayYobta'
import { minCharactersYobta } from '../minCharactersYobta'
import { stringYobta } from '../stringYobta'
import { yobta } from '../yobta'
import { itemsYobta } from './'

const validate = yobta(
  arrayYobta(),
  itemsYobta(stringYobta(), minCharactersYobta(5)),
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
