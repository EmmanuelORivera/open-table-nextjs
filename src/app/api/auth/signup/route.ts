import { AuthInputs } from '@/interfaces/AuthInputs'
import { NextRequest, NextResponse } from 'next/server'
import * as jose from 'jose'
import { AuthService } from '@/services/AuthService'
import { UserService } from '@/services/PrismaUserService'

export async function POST(req: NextRequest) {
  const inputs: AuthInputs = await req.json()
  const errors: string[] = AuthService.validateInputs(inputs)

  if (errors.length) {
    return NextResponse.json({ errorMessage: errors[0] }, { status: 400 })
  }

  const userExists = await UserService.findUserByEmail(inputs.email)
  if (userExists) {
    return NextResponse.json(
      { errorMessage: 'Email is associated with another account' },
      { status: 400 }
    )
  }

  const hashedPassowrd = await AuthService.hashPassword(inputs.password)

  const user = await UserService.createUser({
    ...inputs,
    password: hashedPassowrd,
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
