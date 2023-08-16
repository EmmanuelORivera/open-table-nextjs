import { times } from '@/data'
import { Booking, BookingService } from '@/interfaces/BookingService'
import { RestaurantService } from '@/interfaces/RestaurantService'
import { PrismaBookingService } from '@/services/PrismaBookingService'
import { PrismaRestaurantService } from '@/services/PrismaRestaurantService'

import { NextRequest, NextResponse } from 'next/server'

function parseQueryParameters(url: URL) {
  const day = url.searchParams.get('day')
  const time = url.searchParams.get('time')
  const partySize = url.searchParams.get('partySize')

  return { day, time, partySize }
}

function constructBookingTablesObj(bookings: Booking[]): {
  [key: string]: { [key: number]: true }
} {
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
  return bookingTablesObj
}

export async function GET(req: NextRequest) {
  const url = new URL(req.url)
  const pathSegment = url.pathname.split('/')
  const slug = pathSegment[pathSegment.length - 2]

  //query strings
  const { day, time, partySize } = parseQueryParameters(url)

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

  const bookingService: BookingService = PrismaBookingService.getInstance()

  const startTime = new Date(`${day}T${searchTimes[0]}`)
  const endTime = new Date(`${day}T${searchTimes[searchTimes.length - 1]}`)

  const bookings = await bookingService.fetchBookingByTimeRange(
    startTime,
    endTime
  )

  const restaurantService: RestaurantService =
    PrismaRestaurantService.getInstance()

  const restaurant = await restaurantService.fetchRestaurantWithTables(slug)

  if (!restaurant) {
    return NextResponse.json(
      { errorMessage: 'Slug was not found' },
      { status: 400 }
    )
  }
  const bookingTablesObj = constructBookingTablesObj(bookings)
  const tables = restaurant.table
  return NextResponse.json({ searchTimes, bookings, bookingTablesObj, tables })
}
