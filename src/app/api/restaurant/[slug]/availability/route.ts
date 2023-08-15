import { times } from '@/data'

import { NextRequest, NextResponse } from 'next/server'

export async function GET(req: NextRequest) {
  const url = new URL(req.url)
  const pathSegment = url.pathname.split('/')
  const slug = pathSegment[pathSegment.length - 1]

  //query strings
  const day = url.searchParams.get('day')
  const time = url.searchParams.get('time')
  const partySize = url.searchParams.get('partySize')

  if (!day || !time || !partySize) {
    return NextResponse.json(
      { errorMessage: 'Invalid data provided' },
      { status: 400 }
    )
  }

  const searchTimes = times.find((t) => t.time === time)?.searchTimes

  if (!searchTimes) {
    return NextResponse.json(
      { errorMessage: 'Invalid time provided' },
      { status: 400 }
    )
  }

  return NextResponse.json({ searchTimes })
}
