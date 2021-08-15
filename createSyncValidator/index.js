const field = '@root'

export const createSyncValidator = validate => input => {
  let errors = []
  let pushError = error => errors.push(error)

  let result

  try {
    result = validate({
      async: false,
      field,
      path: [],
      pushError
    })(input)
  } catch (error) {
    pushError({ field, message: error.message, path: [] })
  }

  return errors.length ? [null, errors] : [result, null]
}
