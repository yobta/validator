export type YobtaUnwrapPromise<T> = T extends Promise<infer U> ? U : T
