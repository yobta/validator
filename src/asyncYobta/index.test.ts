import { asyncYobta } from '.'
import { YobtaError } from '..'
import { booleanYobta } from '../booleanYobta'
import { catchYobta } from '../catchYobta'
import { fromEntriesYobta } from '../fromEntriesYobta'
import { minCharactersYobta } from '../minCharactersYobta'
import { numberYobta } from '../numberYobta'
import { oneOfYobta } from '../oneOfYobta'
import { requiredYobta } from '../requiredYobta'
import { shapeYobta } from '../shapeYobta'
import { stringYobta } from '../stringYobta'
import { urlSearchParamsYobta } from '../urlSearchParamsYobta'

let validate = asyncYobta(numberYobta('yobta!'))

it('accepts valid', async () => {
  let result = await validate(1)
  expect(result).toEqual([1, null])
})

it('can pipe rules', async () => {
  let validateMultiple = asyncYobta(
    stringYobta(),
    requiredYobta(),
    minCharactersYobta(5)
  )
  let result = await validateMultiple('yobta')
  expect(result).toEqual(['yobta', null])
})

it('rejects invalid', async () => {
  let attempt = async (): Promise<any> => await validate([])
  let result = await attempt()
  expect(result).toEqual([
    null,
    [
      {
        field: '@',
        message: 'yobta!',
        name: 'Error',
        path: []
      }
    ]
  ])
})

let validateSearch = asyncYobta(
  urlSearchParamsYobta(),
  fromEntriesYobta(),
  shapeYobta({
    currentTab: [catchYobta('tab-1', oneOfYobta(['tab-1', 'tab-2', 'tab-3']))],
    myModalIsOpen: [catchYobta(false, booleanYobta(), requiredYobta())]
  })
)

it("creates default state when can't extract it from url", async () => {
  expect(await validateSearch('')).toEqual([
    {
      currentTab: 'tab-1',
      myModalIsOpen: false
    },
    null
  ])
})

it('extracts state from url', async () => {
  expect(await validateSearch('currentTab=tab-3&myModalIsOpen=true')).toEqual([
    {
      currentTab: 'tab-3',
      myModalIsOpen: true
    },
    null
  ])
})

it('captures context errors', async () => {
  let error: YobtaError = {
    name: 'error',
    message: 'yobta',
    path: [],
    field: '@'
  }
  let validateContext = asyncYobta(({ pushError }) => (item: any) => {
    if (typeof item !== 'string') pushError(error)
    return item
  })
  let result = await validateContext(1)
  expect(result).toEqual([null, [error]])
})
