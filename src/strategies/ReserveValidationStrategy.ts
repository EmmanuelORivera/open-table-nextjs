import { ReserveFormInputs } from '@/interfaces/ReserveFormInputs'
import { ValidationStrategy } from '@/interfaces/ValidationStrategy'

export class ReserveValidationStrategy
  implements ValidationStrategy<ReserveFormInputs>
{
  isValid(inputs: ReserveFormInputs): boolean {
    return (
      !!inputs.first_name &&
      !!inputs.last_name &&
      !!inputs.phone &&
      !!inputs.email
    )
  }
}
