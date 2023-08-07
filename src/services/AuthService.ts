import validator from 'validator'
import bcrypt from 'bcrypt'
import * as jose from 'jose'
import { AuthInputs } from '@/interfaces/AuthInputs'

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
  static validateSigupInputs(inputs: AuthInputs): string[] {
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
