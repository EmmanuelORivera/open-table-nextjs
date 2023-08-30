import validator from 'validator'
import bcrypt from 'bcrypt'
import * as jose from 'jose'
import { AuthInputs } from '@/interfaces/AuthInputs'
import { ReserveFormInputs } from '@/interfaces/ReserveFormInputs'

interface ValidationSchema {
  valid: boolean
  errorMessage: string
}

interface JWTPayload {
  email: string
  exp: number
}

export class AuthService {
  static validateInputs(validationSchema: ValidationSchema[]): string[] {
    const errors: string[] = []

    validationSchema.forEach((check) => {
      if (!check.valid) {
        errors.push(check.errorMessage)
      }
    })

    return errors
  }
  static validateReserveInputs(inputs: ReserveFormInputs): string[] {
    const validationSchema = [
      {
        valid: validator.isLength(inputs.first_name, { min: 1, max: 25 }),
        errorMessage: 'First name is invalid',
      },
      {
        valid: validator.isLength(inputs.last_name, { min: 1, max: 25 }),
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
        valid: validator.isLength(inputs.occasion || '', { max: 100 }),
        errorMessage: 'Occasion must be at most 100 characters',
      },
      {
        valid: validator.isLength(inputs.request || '', { max: 100 }),
        errorMessage: 'Request must be at most 100 characters',
      },
    ]

    return AuthService.validateInputs(validationSchema)
  }
  static validateSigupInputs(inputs: AuthInputs): string[] {
    const validationSchema = [
      {
        valid: validator.isLength(inputs.first_name, { min: 1, max: 25 }),
        errorMessage: 'First name is invalid',
      },
      {
        valid: validator.isLength(inputs.last_name, { min: 1, max: 25 }),
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

    return AuthService.validateInputs(validationSchema)
  }

  static validateSigninInputs(email: string, password: string): string[] {
    const validationSchema = [
      {
        valid: validator.isEmail(email),
        errorMessage: 'Email is invalid',
      },
      {
        valid: validator.isLength(password, { min: 1 }),
        errorMessage: 'Password is invalid',
      },
    ]

    return AuthService.validateInputs(validationSchema)
  }

  static hashPassword(password: string): Promise<string> {
    return bcrypt.hash(password, 10)
  }

  static generateToken(email: string): Promise<string> {
    const alg = 'HS256'
    const secret = new TextEncoder().encode(process.env.JWT)

    return new jose.SignJWT({ email })
      .setProtectedHeader({
        alg,
      })
      .setExpirationTime('24h')
      .sign(secret)
  }

  static decodeJwt(token: string): JWTPayload {
    return jose.decodeJwt(token) as { email: string; exp: number }
  }
}
