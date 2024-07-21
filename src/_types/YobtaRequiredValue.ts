import type { YobtaEmpty } from './YobtaEmpty'

export type YobtaRequiredValue<Value> = Value extends YobtaEmpty ? never : Value
