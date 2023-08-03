import { NextRequest, NextResponse } from 'next/server'
import { headers } from 'next/headers'
import { AuthService } from '@/services/AuthService'
import { PrismaUserService } from '@/services/PrismaUserService'
import { UserService } from '@/interfaces/UserService'

export async function GET(req: NextRequest) {
  const headersList = headers()
  const bearerToken = headersList.get('authorization')

  if (!bearerToken) {
    return NextResponse.json(
      { errorMessage: 'Unauthorized request' },
      { status: 401 }
    )
  }

  const token = bearerToken?.split(' ')[1] as string

  if (!token) {
    return NextResponse.json(
      { errorMessage: 'Unauthorized request' },
      { status: 401 }
    )
  }

  const isTokenValid = await AuthService.verifyToken(token)

  if (!isTokenValid) {
    return NextResponse.json(
      { errorMessage: 'Unauthorized request' },
      { status: 401 }
    )
  }

  const payload = AuthService.decodeJwt(token)

  if (!payload.email) {
    return NextResponse.json(
      { errorMessage: 'Unauthorized request' },
      { status: 401 }
    )
  }

  const userService: UserService = new PrismaUserService()
  const user = await userService.findUserByEmailWithSelect(payload.email)

  return NextResponse.json({ user })
}
