import { AuthInputs } from '@/interfaces/AuthInputs'
import { prisma } from '@/services/PrismaSingleton'
import { Prisma } from '@prisma/client'
import { NextRequest, NextResponse } from 'next/server'
import validator from 'validator'
import bcrypt from 'bcrypt'
import * as jose from 'jose'

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

  const userExists = await prisma.user.findFirst({
    where: {
      email,
    },
  })

  if (userExists) {
    return NextResponse.json(
      { errorMessage: 'Email is associated with another account' },
      { status: 400 }
    )
  }

  const hashedPassword = await bcrypt.hash(password, 10)

  const user = await prisma.user.create({
    data: {
      first_name: firstName,
      last_name: lastName,
      password: hashedPassword,
      city,
      phone,
      email,
    },
  })

  const alg = 'HS256'
  const secret = new TextEncoder().encode(process.env.JWT_SECRET)

  const token = await new jose.SignJWT({ email: user.email })
    .setProtectedHeader({
      alg,
    })
    .setExpirationTime('24h')
    .sign(secret)

  return NextResponse.json({
    user,
    token,
  })
}
