import { Booking, BookingService } from '@/interfaces/BookingService'
import { RestaurantService } from '@/interfaces/RestaurantService'
import { parseQueryParameters } from './parseQueryParameters'
import { times } from '@/data'
import { NextResponse } from 'next/server'
import { RestaurantWithTables } from '@/interfaces/Restaurant'
import { Table } from '@prisma/client'

interface TableBookingMap {
  [key: string]: { [key: number]: true }
}

interface SearchTimesWithTables {
  date: Date
  time: string
  tables: Table[]
}

export class AvailabilitiesCalculator {
  public bookingService: BookingService
  public restaurantService: RestaurantService

  constructor(
    bookingService: BookingService,
    restaurantService: RestaurantService
  ) {
    this.bookingService = bookingService
    this.restaurantService = restaurantService
  }

  async calculateAvailabilities(url: URL) {
    const { day, partySize, time, slug } = parseQueryParameters(url)

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

    const startTime = new Date(`${day}T${searchTimes[0]}`)
    const endTime = new Date(`${day}T${searchTimes[searchTimes.length - 1]}`)

    const bookings = await this.bookingService.fetchBookingByTimeRange(
      startTime,
      endTime
    )

    const restaurant: RestaurantWithTables | null =
      await this.restaurantService.fetchRestaurantWithTables(slug)

    if (!restaurant) {
      return NextResponse.json(
        { errorMessage: 'Slug was not found' },
        { status: 400 }
      )
    }

    const bookingTablesObj: TableBookingMap =
      this.generateBookingTablesObj(bookings)

    const searchTimesWithTables: SearchTimesWithTables[] =
      this.generateSearchTimesWithTables(
        day,
        searchTimes,
        restaurant.table,
        bookingTablesObj
      )

    const availabilities = this.calculateAvailableTimes(
      searchTimesWithTables,
      partySize,
      day,
      restaurant.open_time,
      restaurant.close_time
    )

    return NextResponse.json(availabilities)
  }

  generateBookingTablesObj(bookings: Booking[]): TableBookingMap {
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

  generateSearchTimesWithTables(
    day: string,
    searchTimes: string[],
    tables: Table[],
    bookingTablesObj: TableBookingMap
  ) {
    const searchTimesWithTables = searchTimes.map((searchTime) => {
      return {
        date: new Date(`${day}T${searchTime}`),
        time: searchTime,
        tables, // the list of all available tables
      }
    })

    searchTimesWithTables.forEach((searchTime) => {
      const { date } = searchTime

      searchTime.tables = searchTime.tables.filter((table) => {
        const bookingTableObjForTime = bookingTablesObj[date.toISOString()]

        // if bookingTablesObj has a record for this time and table, exclude it
        if (bookingTableObjForTime && bookingTableObjForTime[table.id]) {
          return false
        }
        return true
      })
    })

    return searchTimesWithTables
  }

  calculateAvailableTimes(
    searchTimesWithTables: SearchTimesWithTables[],
    partySize: string,
    day: string,
    openTime: string,
    closeTime: string
  ) {
    const availabilities: {
      time: string
      available: boolean
    }[] = searchTimesWithTables
      .map((t) => {
        const sumSeats = t.tables.reduce((sum, table) => {
          return sum + table.seats
        }, 0)

        return {
          time: t.time,
          available: sumSeats >= parseInt(partySize),
        }
      })
      .filter((availability) => {
        const timeIsAfterOpeningHours =
          new Date(`${day}T${availability.time}`) >=
          new Date(`${day}T${openTime}`)

        const timeIsBeforeClosingHour =
          new Date(`${day}T${availability.time}`) <=
          new Date(`${day}T${closeTime}`)

        return timeIsAfterOpeningHours && timeIsBeforeClosingHour
      })

    return availabilities
  }
}
