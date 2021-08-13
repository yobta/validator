export const pipe =
  (...functions) =>
  input =>
    functions.reduce((prev, next) => next(prev), input)
