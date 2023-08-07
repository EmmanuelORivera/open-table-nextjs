import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import * as jose from 'jose'

export async function middleware(req: NextRequest) {
  const requestHeaders = new Headers(req.headers)
  const bearerToken = requestHeaders.get('authorization')

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

  const secret = new TextEncoder().encode(process.env.JWT)

  try {
    await jose.jwtVerify(token, secret)
  } catch (error) {
    return NextResponse.json(
      { errorMessage: 'Unauthorized request' },
      { status: 401 }
    )
  }

  requestHeaders.set('authorization', token)

  const response = NextResponse.next({
    request: {
      headers: requestHeaders,
    },
  })

  return response
}

export const config = {
  matcher: ['/api/auth/me'],
}
