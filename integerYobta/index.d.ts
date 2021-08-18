import { SyncRule } from '../createRule/index.js'

export const integerMessage: string

export function integerYobta<I extends number | undefined>(
  message?: string
): SyncRule<I, number | undefined>
