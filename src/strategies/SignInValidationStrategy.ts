import { SignInAuthInputs } from '@/interfaces/SignInAuthInputs'
import { ValidationStrategy } from '@/interfaces/ValidationStrategy'

export class SignInValidationStrategy
  implements ValidationStrategy<SignInAuthInputs>
{
  isValid(inputs: SignInAuthInputs): boolean {
    return !!inputs.email && !!inputs.password
  }
}
