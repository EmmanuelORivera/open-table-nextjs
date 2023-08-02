import { AuthInputs } from '@/interfaces/AuthInputs'
import { NextRequest, NextResponse } from 'next/server'
import { AuthService } from '@/services/AuthService'
import { PrismaUserService } from '@/services/PrismaUserService'
import { User } from '@prisma/client'
import { UserService } from '@/interfaces/UserService'

export async function POST(req: NextRequest) {
  const inputs: AuthInputs = await req.json()
  const errors: string[] = AuthService.validateSigupInputs(inputs)

  if (errors.length) {
    return NextResponse.json({ errorMessage: errors[0] }, { status: 400 })
  }

  const userService: UserService = new PrismaUserService()

  const userExists = await userService.findUserByEmail(inputs.email)
  if (userExists) {
    return NextResponse.json(
      { errorMessage: 'Email is associated with another account' },
      { status: 400 }
    )
  }

  const hashedPassowrd = await AuthService.hashPassword(inputs.password)

  const user: User = await userService.createUser({
    ...inputs,
    password: hashedPassowrd,
  })

  const token = await AuthService.generateToken(user.email)

  return NextResponse.json({
    user,
    token,
  })
}
