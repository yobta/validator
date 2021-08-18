export const createRule = validate => context => input =>
  validate(input, context)
