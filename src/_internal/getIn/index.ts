// https://github.com/lodash/lodash/blob/master/.internal/baseGet.js

import type { YobtaPath } from '../../_types/YobtaPath'

export function getIn<I>(input: any, path: YobtaPath): I {
  let index = 0
  while (input != null && index < path.length) {
    input = input[path[index++]]
  }
  return index && index === path.length ? input : undefined
}
