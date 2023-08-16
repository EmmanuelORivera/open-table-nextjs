import { times } from '@/data'
import { prisma } from '@/services/PrismaSingleton'

import { NextRequest, NextResponse } from 'next/server'

export async function GET(req: NextRequest) {
  const url = new URL(req.url)
  const pathSegment = url.pathname.split('/')
  const slug = pathSegment[pathSegment.length - 2]

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

  const bookings = await prisma.booking.findMany({
    where: {
      booking_time: {
        gte: new Date(`${day}T${searchTimes[0]}`),
        lte: new Date(`${day}T${searchTimes[searchTimes.length - 1]}`),
      },
    },
    select: {
      number_of_people: true,
      booking_time: true,
      tables: true,
    },
  })

  const bookingTablesObj: { [key: string]: { [key: number]: true } } = {}

  bookings.forEach((booking) => {
    bookingTablesObj[booking.booking_time.toISOString()] =
      booking.tables.reduce((obj, table) => {
        return {
          ...obj,
          [table.table_id]: true,
        }
      }, {})
  })

  return NextResponse.json({ searchTimes, bookings, bookingTablesObj })
}
