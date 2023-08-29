import { Booking, BookingService } from '@/interfaces/BookingService'
import { RestaurantService } from '@/interfaces/RestaurantService'
import { parseQueryParameters } from './parseQueryParameters'
import { times } from '@/data'
import { NextRequest, NextResponse } from 'next/server'
import { RestaurantWithTables } from '@/interfaces/Restaurant'
import { Table } from '@prisma/client'

interface JsonRequestData {
  bookerEmail: string
  bookerPhone: string
  bookerFirstName: string
  bookerLastName: string
  bookerOccasion?: string
  bookerRequests?: string
}
export interface TableBookingMap {
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
  private isAvailabilityRoute: boolean

  constructor(
    bookingService: BookingService,
    restaurantService: RestaurantService,
    isAvailabilityRoute: boolean = true
  ) {
    this.bookingService = bookingService
    this.restaurantService = restaurantService
    this.isAvailabilityRoute = isAvailabilityRoute
  }

  async calculateAvailabilities(url: URL, req: NextRequest) {
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
        { errorMessage: 'Restaurant not found' },
        { status: 400 }
      )
    }

    if (
      new Date(`${day}T${time}`) < new Date(`${day}T${restaurant.open_time}`) ||
      new Date(`${day}T${time}`) > new Date(`${day}T${restaurant.close_time}`)
    ) {
      return NextResponse.json(
        { errorMessage: 'Restaurant is not open at that time' },
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

    if (!searchTimesWithTables) {
      return NextResponse.json('Invalid data provided', { status: 400 })
    }

    if (this.isAvailabilityRoute) {
      const availabilities = this.calculateAvailableTimes(
        searchTimesWithTables,
        partySize,
        day,
        restaurant.open_time,
        restaurant.close_time
      )
      return NextResponse.json(availabilities)
    } else {
      const searchTimeWithTables = searchTimesWithTables.find((t) => {
        return t.date.toISOString() === new Date(`${day}T${time}`).toISOString()
      })

      if (!searchTimeWithTables) {
        return NextResponse.json('No availability, cannot book', {
          status: 400,
        })
      }

      const tablesCount: { 2: number[]; 4: number[] } = {
        2: [],
        4: [],
      }

      searchTimeWithTables.tables.forEach((table) => {
        if (table.seats === 2) {
          tablesCount[2].push(table.id)
        } else {
          tablesCount[4].push(table.id)
        }
      })

      const tablesToBooks: number[] = []

      let seatsRemaining = parseInt(partySize)

      while (seatsRemaining > 0) {
        if (seatsRemaining >= 3) {
          if (tablesCount[4].length) {
            tablesToBooks.push(tablesCount[4][0])
            tablesCount[4].shift()
            seatsRemaining = seatsRemaining - 4
          } else {
            tablesToBooks.push(tablesCount[2][0])
            tablesCount[2].shift()
            seatsRemaining = seatsRemaining - 2
          }
        } else {
          if (tablesCount[2].length) {
            tablesToBooks.push(tablesCount[2][0])
            tablesCount[2].shift()
            seatsRemaining = seatsRemaining - 2
          } else {
            tablesToBooks.push(tablesCount[4][0])
            tablesCount[4].shift()
            seatsRemaining = seatsRemaining - 4
          }
        }
      }

      const {
        bookerEmail,
        bookerPhone,
        bookerFirstName,
        bookerLastName,
        bookerOccasion,
        bookerRequests,
      }: JsonRequestData = await req.json()

      const booking = await this.bookingService.createBooking(
        {
          partySize,
          restaurant,
          day,
          time,
          bookerEmail,
          bookerPhone,
          bookerFirstName,
          bookerLastName,
          bookerOccasion,
          bookerRequests,
        },
        tablesToBooks
      )

      return NextResponse.json(booking)
    }
  }

  generateBookingTablesObj(bookings: Booking[]): TableBookingMap {
    const bookingTablesObj: TableBookingMap = {}

    bookings.forEach((booking) => {
      const bookingTimeKey = booking.booking_time.toISOString()

      // Check if tablesForBooking already exists for this booking time
      if (!bookingTablesObj[bookingTimeKey]) {
        bookingTablesObj[bookingTimeKey] = {}
      }

      const tablesForBooking = bookingTablesObj[bookingTimeKey]

      booking.tables.forEach((table) => {
        tablesForBooking[table.table_id] = true
      })
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
