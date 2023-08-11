import { UserService } from '@/interfaces/UserService'
import bcrypt from 'bcrypt'
import { PrismaUserService } from '@/services/PrismaUserService'
import { NextRequest, NextResponse } from 'next/server'
import { AuthService } from '@/services/AuthService'
import { cookies } from 'next/headers'

export async function POST(req: NextRequest) {
  const { email, password } = await req.json()

  const errors = AuthService.validateSigninInputs(email, password)

  if (errors.length) {
    return NextResponse.json({ errorMessage: errors[0] }, { status: 400 })
  }

  const userService: UserService = new PrismaUserService()

  const user = await userService.findUserByEmail(email)

  if (!user) {
    return NextResponse.json(
      { errorMessage: 'Email or password is invalid' },
      { status: 401 }
    )
  }

  const isMatch = await bcrypt.compare(password, user.password)

  if (!isMatch) {
    return NextResponse.json(
      { errorMessage: 'Email or password is invalid' },
      { status: 401 }
    )
  }

  const token = await AuthService.generateToken(user.email)
  const oneDay = 24 * 60 * 60 * 1000
  const expires = Date.now() + oneDay
  cookies().set('jwt', token, { expires })

  return NextResponse.json({
    first_name: user.first_name,
    last_name: user.last_name,
    email: user.email,
    phone: user.phone,
    city: user.city,
  })
}
