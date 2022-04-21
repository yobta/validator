// https://github.com/lodash/lodash/blob/master/.internal/baseGet.js

import { Path } from '../createContext/index.js'

export function getIn<I>(input: any, path: Path): I {
  let index = 0
  while (input != null && index < path.length) {
    input = input[path[index++]]
  }
  return index && index === path.length ? input : undefined
}
