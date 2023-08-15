'use client'
import Button from '@/components/Button'
import { partySize, times } from '@/data'
import { useState } from 'react'
import ReactDatePicker from 'react-datepicker'

interface MakeAReservationProps {
  openTime: string
  closeTime: string
  hideOnLargeScreen?: boolean
  className?: string
}

const MakeAReservation = ({
  openTime,
  closeTime,
  hideOnLargeScreen = false,
  className,
}: MakeAReservationProps) => {
  const [selectedDate, setSelectedDate] = useState<Date | null>(new Date())
  const hiddenStyle = hideOnLargeScreen ? 'lg:hidden' : ''
  const handleChangeDate = (date: Date | null) => {
    if (date) {
      return setSelectedDate(date)
    }
    setSelectedDate(null)
  }

  const filterTimeByRestaurantOpenWindow = () => {
    // openTime = 14:30:00.000Z 2:30PM
    // closeTime = 21:30:00.000Z 9:30PM

    const timesWithinWindow: typeof times = []

    let isWithinWindow = false

    for (const timeSlot of times) {
      if (timeSlot.time === openTime) {
        isWithinWindow = true
      }
      if (isWithinWindow) {
        timesWithinWindow.push(timeSlot)
      }
      if (timeSlot.time === closeTime) {
        break
      }
    }

    return timesWithinWindow
  }

  return (
    <section className={`shadow p-4 my-4 ${hiddenStyle} ${className}`}>
      <h2 className="text-lg font-semibold text-center pb-3 border-b">
        Make a Reservation
      </h2>

      <div className="grid gap-3 my-3">
        <div className="flex flex-col">
          <label htmlFor="" className="font-medium">
            Party size
          </label>
          <select name="" className="py-3 border-b font-light" id="">
            {partySize.map((size) => (
              <option value={size.value}>{size.label}</option>
            ))}
          </select>
        </div>

        <div className="flex flex-col w-full">
          <label htmlFor="" className="font-medium">
            Date
          </label>
          <ReactDatePicker
            selected={selectedDate}
            onChange={handleChangeDate}
            className="py-3 border-b font-light"
            dateFormat="MMMM d yyyy"
          />
        </div>

        <div className="flex flex-col w-full ">
          <label htmlFor="" className="font-medium">
            Time
          </label>
          <select name="" id="" className="py-3 border-b font-light">
            {filterTimeByRestaurantOpenWindow().map((time) => (
              <option value={time.time}>{time.displayTime}</option>
            ))}
          </select>
          <Button className="mt-3" type="action" handleClick={() => {}}>
            Find a time
          </Button>
        </div>
      </div>
    </section>
  )
}

export default MakeAReservation
