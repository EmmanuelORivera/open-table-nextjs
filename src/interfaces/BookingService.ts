import { BookingsOnTables, Prisma } from '@prisma/client'
import { RestaurantWithTables } from './Restaurant'

export interface Booking {
  number_of_people: number
  booking_time: Date
  tables: BookingsOnTables[]
}
export interface CreateBookingProps {
  partySize: string
  restaurant: RestaurantWithTables
  day: string
  time: string
  bookerEmail: string
  bookerPhone: string
  bookerFirstName: string
  bookerLastName: string
  bookerOccasion?: string
  bookerRequest?: string
}
export interface BookingService {
  fetchBookingByTimeRange(startTime: Date, endTime: Date): Promise<Booking[]>
  createBooking(
    props: CreateBookingProps,
    tablesToBooks: number[]
  ): Promise<Booking>
}
