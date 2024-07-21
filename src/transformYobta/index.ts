import type { YobtaContext } from '../_types/YobtaContext.js'
import type { YobtaPretty } from '../_types/YobtaPretty.js'
import type { YobtaSyncRule } from '../ruleYobta/index.js'
import { ruleYobta } from '../ruleYobta/index.js'

type Transformer<I, O> = (
  input: I,
  context: Readonly<YobtaPretty<YobtaContext>>,
) => O

interface TransformYobtaRule {
  <I, O>(transform: Transformer<I, O>): YobtaSyncRule<I, O>
}

export const transformYobta: TransformYobtaRule = transform =>
  ruleYobta(transform)
