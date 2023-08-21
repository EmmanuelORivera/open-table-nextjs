import { AuthInputs } from '@/interfaces/AuthInputs'
import { ValidationStrategy } from '@/interfaces/ValidationStrategy'

export class SignUpValidationStrategy implements ValidationStrategy {
  isValid(inputs: AuthInputs): boolean {
    return (
      !!inputs.first_name &&
      !!inputs.last_name &&
      !!inputs.email &&
      !!inputs.password &&
      !!inputs.city &&
      !!inputs.phone
    )
  }
}
