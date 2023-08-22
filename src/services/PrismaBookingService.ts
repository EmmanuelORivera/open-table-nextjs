import {
  Booking,
  BookingService,
  CreateBookingProps,
} from '@/interfaces/BookingService'
import { prisma } from './PrismaSingleton'

export class PrismaBookingService implements BookingService {
  private static instance: PrismaBookingService

  public static getInstance(): PrismaBookingService {
    if (!PrismaBookingService.instance) {
      PrismaBookingService.instance = new PrismaBookingService()
    }
    return PrismaBookingService.instance
  }

  async fetchBookingByTimeRange(
    startTime: Date,
    endTime: Date
  ): Promise<Booking[]> {
    const bookings = prisma.booking.findMany({
      where: {
        booking_time: {
          gte: startTime,
          lte: endTime,
        },
      },
      select: {
        number_of_people: true,
        booking_time: true,
        tables: true,
      },
    })

    return bookings
  }

  async createBooking(
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
    }: CreateBookingProps,
    tablesToBooks: number[]
  ) {
    {
      const booking = await prisma.booking.create({
        data: {
          restaurant_id: restaurant.id,
          number_of_people: parseInt(partySize),
          booking_time: new Date(`${day}T${time}`),
          booker_email: bookerEmail,
          booker_phone: bookerPhone,
          booker_first_name: bookerFirstName,
          booker_last_name: bookerLastName,
          booker_occasion: bookerOccasion,
          booker_request: bookerRequests,
        },
      })

      const bookingsOnTablesData = tablesToBooks.map((table_id) => {
        return {
          table_id,
          booking_id: booking.id,
        }
      })

      await prisma.bookingsOnTables.createMany({
        data: bookingsOnTablesData,
      })

      return booking
    }
  }
}
