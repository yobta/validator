import { SyncRule } from '../createRule/index.js'

type MessageFunc = (limit: number) => string

export const maximumYobtaMessage: MessageFunc

export function maximumYobta<I extends number>(
  limit: number,
  message?: MessageFunc
): SyncRule<I, I>
