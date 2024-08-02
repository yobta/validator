export type YobtaRequiredValue<Value> = Value extends '' | null | undefined
  ? never
  : Value
