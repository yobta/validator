export type YobtaPretty<T> = {
  [K in keyof T]: T[K]
}
