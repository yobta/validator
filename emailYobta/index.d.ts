import { SyncRule } from '../createRule/index.js'

export const emailMessage: string

export function emailYobta<I extends string | undefined>(
  message?: string
): SyncRule<I, I>
