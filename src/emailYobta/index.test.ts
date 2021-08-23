/* eslint-disable no-useless-escape */
import { syncYobta } from '../syncYobta'
import { YobtaError } from '../YobtaError'
import { emailYobta, emailMessage } from './'

const customMessage = 'yobta!'
const validate = syncYobta(emailYobta(customMessage))

let validEmails = [
  'simple@example.com',
  'very.common@example.com',
  'disposable.style.email.with+symbol@example.com',
  'other.email-with-hyphen@example.com',
  'fully-qualified-domain@example.com',
  'user.name+tag+sorting@example.com',
  'x@example.com',
  'example-indeed@strange-example.com',
  'test/test@test.com',
  'example@s.example',
  '" "@example.org',
  '"john..doe"@example.org',
  'mailhost!username@example.org',
  'user%example.com@example.org',
  'user-@example.org'
]
validEmails.forEach(option => {
  it(`accepts ${option}`, () => {
    let result = validate(option)
    expect(result).toEqual([option, null])
  })
})

it('accepts undefined', () => {
  let result = validate(undefined)
  expect(result).toEqual([undefined, null])
})

it('trims whitespace', () => {
  let result = validate(' bill@microsoft.com ')
  expect(result).toEqual(['bill@microsoft.com', null])
})

let invalidEmails = [
  'admin@mailserver1',
  'Abc.example.com',
  'A@b@c@example.com',
  'a"b(c)d,e:f;g<h>i[jk]l@example.com',
  'just"not"right@example.com',
  'this is"notallowed@example.com',
  'this still"not\\allowed@example.com',
  // '1234567890123456789012345678901234567890123456789012345678901234+x@example.com',
  'i_like_underscore@but_its_not_allowed_in_this_part.example.com',
  'QA[icon]CHOCOLATE[icon]@test.com'
]
invalidEmails.forEach(option => {
  it(`rejects ${option}`, () => {
    let result = validate(option)
    expect(result).toEqual([
      null,
      [new YobtaError({ field: '@root', message: customMessage, path: [] })]
    ])
  })
})

it('has default error message', () => {
  let rule = emailYobta()
  let validateDefault = syncYobta(rule)
  let result = validateDefault('yobta')
  expect(result).toEqual([
    null,
    [new YobtaError({ field: '@root', message: emailMessage, path: [] })]
  ])
})
