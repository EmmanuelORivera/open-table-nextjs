import { Booking, BookingService } from '@/interfaces/BookingService'
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
}
