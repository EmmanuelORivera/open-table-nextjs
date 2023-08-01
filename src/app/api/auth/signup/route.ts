import { AuthInputs } from '@/interfaces/AuthInputs'
import { NextRequest, NextResponse } from 'next/server'
import validator from 'validator'

export async function POST(req: NextRequest) {
  const { firstName, lastName, email, phone, city, password }: AuthInputs =
    await req.json()

  const errors: string[] = []

  const validationSchema = [
    {
      valid: validator.isLength(firstName, { min: 1, max: 25 }),
      errorMessage: 'First name is invalid',
    },
    {
      valid: validator.isLength(lastName, { min: 1, max: 25 }),
      errorMessage: 'Last name is invalid',
    },
    {
      valid: validator.isEmail(email),
      errorMessage: 'Email is invalid',
    },
    {
      valid: validator.isMobilePhone(phone),
      errorMessage: 'Phone number is invalid',
    },
    {
      valid: validator.isLength(city, { min: 1 }),
      errorMessage: 'City is invalid',
    },
    {
      valid: validator.isStrongPassword(password),
      errorMessage: 'Password is not strong enough',
    },
  ]

  validationSchema.forEach((check) => {
    if (!check.valid) {
      errors.push(check.errorMessage)
    }
  })

  if (errors.length) {
    return NextResponse.json({ errorMessage: errors[0] }, { status: 400 })
  }
  return NextResponse.json({
    hello: 'data',
  })
}
