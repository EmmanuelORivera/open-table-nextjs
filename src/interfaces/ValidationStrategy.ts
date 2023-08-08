import { AuthInputs } from './AuthInputs'

export interface ValidationStrategy {
  isValid(inputs: AuthInputs): boolean
}
