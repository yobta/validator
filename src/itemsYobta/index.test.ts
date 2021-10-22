import { stringYobta } from '../stringYobta'
import { yobta } from '../yobta'
import { itemsYobta } from '.'
import { minCharactersYobta } from '../minCharactersYobta'
import { arrayYobta } from '../arrayYobta'

const validate = yobta(
  arrayYobta(),
  itemsYobta(stringYobta(), minCharactersYobta(5)),
)

describe('itemsYobta', () => {
  it('accepts empty array', () => {
    let result = validate([])
    expect(result).toEqual([])
  })

  it('accepts array of strings', () => {
    let result = validate(['yobta'])
    expect(result).toEqual(['yobta'])
  })

  it('rejects empty array', () => {
    let result = (): any => validate([[]])
    expect(result).toThrow('It should be a string')
  })

  it('rejects array with empty string', () => {
    let result = (): any => validate([['']])
    expect(result).toThrow('It should be a string')
  })

  it('rejects array with invalid item', () => {
    let result = (): any => validate([['yobt']])
    expect(result).toThrow('It should be a string')
  })
})
