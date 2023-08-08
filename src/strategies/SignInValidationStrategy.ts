import { AuthInputs } from '@/interfaces/AuthInputs'
import { ValidationStrategy } from '@/interfaces/ValidationStrategy'

export class SignInValidationStrategy implements ValidationStrategy {
  isValid(inputs: AuthInputs): boolean {
    return !!inputs.email && !!inputs.password
  }
}
