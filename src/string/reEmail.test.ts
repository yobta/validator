/* eslint-disable import/extensions */
import { reEmail } from './reEmail'

const validEmails = [
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
  'user-@example.org',
]
const invalidEmails = [
  'admin@mailserver1',
  'Abc.example.com',
  'A@b@c@example.com',
  'a"b(c)d,e:f;g<h>i[jk]l@example.com',
  'just"not"right@example.com',
  'this is"notallowed@example.com',
  'this still"not\\allowed@example.com',
  // '1234567890123456789012345678901234567890123456789012345678901234+x@example.com',
  'i_like_underscore@but_its_not_allowed_in_this_part.example.com',
  'QA[icon]CHOCOLATE[icon]@test.com',
]
validEmails.forEach(option => {
  it(`accepts ${option}`, async () => {
    const result = reEmail.test(option)
    expect(result).toBe(true)
  })
})
invalidEmails.forEach(option => {
  it(`accepts ${option}`, async () => {
    const result = reEmail.test(option)
    expect(result).toBe(false)
  })
})
