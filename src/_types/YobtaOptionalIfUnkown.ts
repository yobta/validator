export type YobtaOptionalIfUnkown<I, O> = I extends unknown ? O | undefined : O
