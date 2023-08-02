import { UserService } from '@/interfaces/UserService'
import bcrypt from 'bcrypt'
import { PrismaUserService } from '@/services/PrismaUserService'
import { NextRequest, NextResponse } from 'next/server'
import { AuthService } from '@/services/AuthService'

export async function POST(req: NextRequest) {
  const { email, password } = await req.json()

  const errors = AuthService.validateSigninInputs(email, password)

  if (errors.length) {
    return NextResponse.json({ errorMessage: errors[0] }, { status: 400 })
  }

  const userService: UserService = new PrismaUserService()

  const userExists = await userService.findUserByEmail(email)

  if (!userExists) {
    return NextResponse.json(
      { errorMessage: 'Email or password is invalid' },
      { status: 401 }
    )
  }

  const isMatch = await bcrypt.compare(password, userExists.password)

  if (!isMatch) {
    return NextResponse.json(
      { errorMessage: 'Email or password is invalid' },
      { status: 401 }
    )
  }

  const token = await AuthService.generateToken(userExists.email)

  return NextResponse.json({ token })
}
