import { BookingsOnTables } from '@prisma/client'

export interface Booking {
  number_of_people: number
  booking_time: Date
  tables: BookingsOnTables[]
}
export interface BookingService {
  fetchBookingByTimeRange(startTime: Date, endTime: Date): Promise<Booking[]>
}
