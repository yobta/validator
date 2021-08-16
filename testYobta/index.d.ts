import { SyncRule } from '../createRule/index.js'

export const testMessage: string

export function testYobta<I extends string>(
  expression: RegExp,
  message?: string
): SyncRule<I, I>
