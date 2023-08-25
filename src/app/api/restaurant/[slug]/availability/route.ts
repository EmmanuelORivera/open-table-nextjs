import { BookingService } from '@/interfaces/BookingService'
import { RestaurantService } from '@/interfaces/RestaurantService'
import { PrismaBookingService } from '@/services/PrismaBookingService'
import { PrismaRestaurantService } from '@/services/PrismaRestaurantService'
import { AvailabilitiesCalculator } from '@/utils/AvailabilitiesCalculator'

import { NextRequest } from 'next/server'

export async function GET(req: NextRequest) {
  const url = new URL(req.url)

  const bookingService: BookingService = PrismaBookingService.getInstance()
  const restaurantService: RestaurantService =
    PrismaRestaurantService.getInstance()

  const calculator = new AvailabilitiesCalculator(
    bookingService,
    restaurantService
  )

  const response = await calculator.calculateAvailabilities(url, req)

  return response
}
