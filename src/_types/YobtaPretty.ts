// export type YobtaPretty<T> = T
export type YobtaPretty<T> = {
  [K in keyof T]: T[K]
} & {}
