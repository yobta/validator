import type { SyncOrAsyncRule } from '../rule/rule.js'
import { rule } from '../rule/rule.js'

export const optional = <I>(): SyncOrAsyncRule<I, I | undefined> =>
  rule<I, I | undefined>((currentValue, { value }) =>
    (value ?? '') === '' ? undefined : currentValue,
  )
