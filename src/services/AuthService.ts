import validator from 'validator'
import bcrypt from 'bcrypt'
import { AuthInputs } from '@/interfaces/AuthInputs'

export class AuthService {
  static validateInputs(inputs: AuthInputs): string[] {
    const errors: string[] = []

    const validationSchema = [
      {
        valid: validator.isLength(inputs.firstName, { min: 1, max: 25 }),
        errorMessage: 'First name is invalid',
      },
      {
        valid: validator.isLength(inputs.lastName, { min: 1, max: 25 }),
        errorMessage: 'Last name is invalid',
      },
      {
        valid: validator.isEmail(inputs.email),
        errorMessage: 'Email is invalid',
      },
      {
        valid: validator.isMobilePhone(inputs.phone),
        errorMessage: 'Phone number is invalid',
      },
      {
        valid: validator.isLength(inputs.city, { min: 1 }),
        errorMessage: 'City is invalid',
      },
      {
        valid: validator.isStrongPassword(inputs.password),
        errorMessage: 'Password is not strong enough',
      },
    ]

    validationSchema.forEach((check) => {
      if (!check.valid) {
        errors.push(check.errorMessage)
      }
    })

    return errors
  }

  static async hashPassword(password: string): Promise<string> {
    return await bcrypt.hash(password, 10)
  }
}
