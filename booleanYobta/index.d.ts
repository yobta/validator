import { SyncRule } from '../createRule/index.js'

export const booleanMessage: string

export function booleanYobta<I>(
  message?: string
): SyncRule<I, boolean | undefined>
