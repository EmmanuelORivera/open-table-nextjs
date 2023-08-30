export interface ValidationStrategy<T> {
  isValid(inputs: T): boolean
}
