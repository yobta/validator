export type YobtaMaybe<I, O> = I extends undefined
  ? O | undefined
  : [unknown] extends [I]
    ? O | undefined
    : O
