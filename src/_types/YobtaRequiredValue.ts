export type YobtaRequiredValue<Value> = Value extends '' | undefined
  ? never
  : Value
