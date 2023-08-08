import { AuthInputs } from '@/interfaces/AuthInputs'
import { ValidationStrategy } from '@/interfaces/ValidationStrategy'

export class SignUpValidationStrategy implements ValidationStrategy {
  isValid(inputs: AuthInputs): boolean {
    return (
      !!inputs.firstName &&
      !!inputs.lastName &&
      !!inputs.email &&
      !!inputs.password &&
      !!inputs.city &&
      !!inputs.phone
    )
  }
}
