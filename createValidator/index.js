export const createValidator = rule => async data => {
  let errors = []
  let path = []
  let pushError = error => errors.push(error)
  let validatedData = await rule({ data, path, pushError })
  return [validatedData, errors]
}

// shape({
//   name: all(required(), string()),
//   age: all(required(), number(), positive(), integer()),
//   email: all(string(), email()),
//   website: url(),
//   number: coerceNumber(min(3), max(5)),
// })
