import { SyncRule } from '../createRule/index.js'

export const testMessage: string

export function testYobta<I extends string | undefined>(
  expression: RegExp,
  message?: string
): SyncRule<I, I>
