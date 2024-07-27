# Yobta!

A promising and ridiculously small es6 validator that tree-shakes well and respects your bundle.

**Current state: work in progress**

## Installation

```
npm i @yobta/validator
```

## Validators

- `createValidator(...rules)` – returns sync validator
- `createAsyncValidator(...syncOrAsyncRules)` – returns aync validator

## Rules

### Pipes

- `pipe(...rules)` – combines several rules to one
- `asyncPipe(...syncOrAsyncRules)` – combines several rules to one

### Sync Rules

- `array(errorMessage)` - creates a array rule, coercing unknown value to array

  - `items(...rules)` – validates every array item against rules
  - `maxItems(limit: () => Number, errorMessage)` – checks if a array length within a limit
  - `minItems(limit: () => Number, errorMessage)` – checks if a array length within a limit

- `boolean(errorMessage)` - creates a boolean rule
- `constant(value, errorMessage)` - creates a strict equality rule
- `date(errorMessage)` - creates a date rule
  - `maxDate(limit: () => Date, errorMessage)` – checks if a value within a date limit
  - `minDate(limit: () => Date, errorMessage)` – checks if a value within a date limit
- `fallback(() => errorMessage)` - creates a rule to replace `string` or `null` with a value
- `number(errorMessage)` - converts a value to a finite `Number` or throws
  - `max(limit: () => Number, errorMessage)` – checks if a value within a limit
  - `min(limit: () => Number, errorMessage)` – checks if a value within a limit
- `oneOf(()=> new Set([1])), errorMessage)` – checks if simple value in a set
- `shape({ key: rule }, errorMessage)` – checks plain object shape
  - `different(() => ['path'], errorMessage)` – creates a rule to check if an onbject key is not equal to antoher key
- `string(errorMessage)` – coerses a simple value to string or throws
  - `email(errorMessage)` – checks if a string value is email
  - `maxCharacters(limit: () => Number, errorMessage)` – checks if a value length within a limit
  - `minCharacters(limit: () => Number, errorMessage)` – checks if a value length within a limit

### Async Rules

- `asyncShape({ field: syncOrAsyncRule() }, errorMessage)` – resolves valid shape

### Effects

- `asyncSubmit(callback)` – executes a callback for a valid form submit
- `effect(callback)` – executes a callback, returns input value
- `errors(callback)` – calls back with `YobtaError`
- `success(callback)` – executes a callback whenever the current step have no errors

### Transforms

- `form(errorMessage)` - transforms formData to `unknowd` record, that can be validated with `shape` or `asyncShape`

### Types

- [+] Shape validator

- [-] Array validator
  - [+] items
  - [-] contains (do later)
  - [+] unique
  - [+] minimum items
  - [+] maximum items
- [-] String validator
  - [+] minimum characters
  - [+] maximum characters
  - [+] email
  - [-] href (do later)
  - [-] credit card number (do later)
  - [-] phone number (do later)
  - [-] base64 (do later)
- [+] Number validator

  - [+] int
  - [+] minimum
  - [+] maximum

- [+] RegExp test
- [+] FormData

### Flow Utilities

- [+] catch
- [+] identical
- [+] URLSearchParams
- [+] side effect
- [+] validityYobta
- [-] anyOf

We want to fulfill the front-end needs and create functional promise-based validator which is fun to work with.

## General Requirements

- Functional
- Universal
- Immutable
- Sync/async
- Coercion (https://ajv.js.org/coercion.html)

## Functional requirements

- Validate: maps, arrays, strings, numbers, booleans, dates, FormData, URLSearchParams
- Flow control: fall-backs, side effects, logic operators, serializers

## API proposals

### Case 1: Store hydration

We need to get a predictable initial state from the URL, the operation
should be sync and silent (no errors) and the state should be a plain
object.

```js
const getInitialState = yobta(
  urlSearchParamsYobta(),
  shapeYobta({
    currentTab: [safe('tab-1', oneOf(()= new Set(['tab-1', 'tab-2', 'tab-3'])))],
    myModalIsOpen: [safe(false, boolean())],
  }),
)

const initialState = getInitialState(location.search)

const myStore = createStore('name', initialState)
```

### Case 2: Form validation

We need to get a type-safe form data, but the validation operation should be async,
because we don't know if one of the fields exists in our database. This operation
can produce errors and we need human friendly error messages.

```js
async function confirmPassword (password) (
  const response = await fetch(`/api/my-endpoint?password=${password}`)
  if (!response.ok) throw new Error('Wrong password')
  return password.data.password
)

const validate = asyncYobta(
  effect(toggleFormLock),
  formYobta()
  asyncShape({
    password: [
      string(),
      asyncSubmit(verifyPassword),
    ],
    new: [
      string(),
      minYobta(6),
      maxYobta(16),
      matchYobta(passwordRegExp), // make your own RegExp
    ],
    repeat: [
      identicalYobta('new')
    ],
  }),
  asyncSubmit(sendMyFormAsJSON),
  errors(),
  validityYobta(console.error), // https://developer.mozilla.org/en-US/docs/Web/API/HTMLObjectElement/setCustomValidity#examples
  effect(toggleFormLock),
)

const myForm = window.getElementByID('myForm')

const [formData, errors] = await validate(myForm)
```

### Docs

- [-] Readme for all
- [-] JSDoc for all

## Samples

- Ajv — Follows [json-schema.org](https://json-schema.org) specs, great choice for a back-end
- Yup — Popular front-end library
- Shark-Validator — a validator es6, but class-based
- formurai — to be researched

Docs coming soon

###### Kudos:

[Andrey Sitnik](https://sitnik.ru)
[Joe Calzaretta](https://github.com/jcalz)
[Jon Schlinkert](https://github.com/jonschlinkert)
[John-David Dalton](https://github.com/jdalton)

###### Pokes:

[YoptaScript](github.com/samgozman/YoptaScript)
