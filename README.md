# Yobta!
A promising and ridiculously small es6 validator that tree-shakes well and respects your bundle.

**Current state: work in progress**

## General Plan
We want to fulfill the front-end needs and create functional promise-based validator which is fun to work with.

## General Requirements
- Functional
- Universal
- Immutable
- Sync/async
- Coercion (https://ajv.js.org/coercion.html)

## Functional requirements
- Validate maps
- Validate arrays
- Validate strings
- Validate numbers
- Validate booleans
- Validate dates
- Validate FormData
- Validate URLSearchParams

## Roadmap

### Types
[-] Async validator
[-] Sync validator
[-] Map validator
[-] Array validator
[-] String validator
  [-] email
  [-] url
[-] Number validator
  [-] int
[-] Boolean validator
[-] Date validator
[-] FormData validator
[-] URLSearchParams validator

### Type Utilities
[-] minDate
[-] maxDate
[-] minLength
[-] maxLength
[-] matches
### Flow Utilities
[-] required
[-] fallback
[-] maxLength
[-] is
[-] isNot
[-] oneOf
[-] anyOf

## Competitors
- Ajv — Follows [json-schema.org](https://json-schema.org) specs, great choice for a back-end
- Yup — Popular front-end library
- Shark-Validator — a validator es6, but class-based
- formurai — to be researched

## Roadmap

Docs coming soon


###### Kudos:
[Andrey Sitnik](https://sitnik.ru)
