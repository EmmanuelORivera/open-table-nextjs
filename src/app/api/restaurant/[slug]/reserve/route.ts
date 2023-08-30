import { BookingService } from '@/interfaces/BookingService'
import { ReserveFormInputs } from '@/interfaces/ReserveFormInputs'
import { RestaurantService } from '@/interfaces/RestaurantService'
import { AuthService } from '@/services/AuthService'
import { PrismaBookingService } from '@/services/PrismaBookingService'
import { PrismaRestaurantService } from '@/services/PrismaRestaurantService'
import { AvailabilitiesCalculator } from '@/utils/AvailabilitiesCalculator'
import { NextRequest, NextResponse } from 'next/server'

export async function POST(req: NextRequest) {
  const reserveFormInputs: ReserveFormInputs = await req.json()
  const errors: string[] = AuthService.validateReserveInputs({
    ...reserveFormInputs,
  })

  if (errors.length) {
    return NextResponse.json({ errorMessage: errors[0] }, { status: 400 })
  }

  const url = new URL(req.url)

  const bookingService: BookingService = PrismaBookingService.getInstance()
  const restaurantService: RestaurantService =
    PrismaRestaurantService.getInstance()

  const calculator = new AvailabilitiesCalculator(
    bookingService,
    restaurantService,
    false
  )

  const response = await calculator.calculateAvailabilities(
    url,
    req,
    reserveFormInputs
  )

  return response
}
