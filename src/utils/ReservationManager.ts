import { Booking } from '@prisma/client'

export class ReservationManager {
  reservations: Booking[]
  constructor(reservations: Booking[]) {
    this.reservations = reservations
  }

  get todayReservations() {
    const today = new Date()
    console.log('reservations: ')
    console.log(this.reservations)
    return this.reservations.filter((reservation) => {
      const reservationDate = new Date(reservation.booking_time)
      console.log('reservation:' + reservation.booking_time)
      console.log('reservationDate' + reservationDate)
      console.log('today:' + today)

      return (
        reservationDate.getDate() === today.getDate() &&
        reservationDate.getMonth() === today.getMonth() &&
        reservationDate.getFullYear() === today.getFullYear()
      )
    })
  }

  get todayReservationsCount() {
    return this.todayReservations.length
  }
}
