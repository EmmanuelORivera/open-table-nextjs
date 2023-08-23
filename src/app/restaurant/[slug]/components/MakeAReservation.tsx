'use client'
import { partySize as partySizes, times } from '@/data'
import useAvailabilities from '@/hooks/useAvailabilities'
import { convertToDisplayTime } from '@/utils/convertToDisplayTime'
import Link from 'next/link'
import { useEffect, useState } from 'react'
import ReactDatePicker from 'react-datepicker'

interface MakeAReservationProps {
  openTime: string
  closeTime: string
  slug: string
  hideOnLargeScreen?: boolean
  className?: string
}

const MakeAReservation = ({
  openTime,
  closeTime,
  slug,
  hideOnLargeScreen = false,
  className,
}: MakeAReservationProps) => {
  const { data, loading, error, fetchAvailabilities } = useAvailabilities()
  const [selectedDate, setSelectedDate] = useState<Date | null>(new Date())
  const [time, setTime] = useState(openTime)
  const [partySize, setPartySize] = useState('2')
  const [day, setDay] = useState(new Date().toISOString().split('T')[0])

  const hasAvailabilities = () => {
    return data?.some((availability) => availability.available === true)
  }
  const hiddenStyle = hideOnLargeScreen ? 'lg:hidden' : ''
  const handleChangeDate = (date: Date | null) => {
    if (date) {
      setDay(date.toISOString().split('T')[0])
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

  useEffect(() => {
    fetchAvailabilities({ slug, partySize, day, time })
  }, [slug, partySize, day, time])

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
          <select
            name=""
            className="py-3 border-b font-light"
            id=""
            value={partySize}
            onChange={(e) => setPartySize(e.target.value)}
          >
            {partySizes.map((size) => (
              <option key={size.label} value={size.value}>
                {size.label}
              </option>
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
          <select
            name=""
            id=""
            className="py-3 border-b font-light"
            value={time}
            onChange={(e) => setTime(e.target.value)}
          >
            {filterTimeByRestaurantOpenWindow().map((time) => (
              <option key={time.displayTime} value={time.time}>
                {time.displayTime}
              </option>
            ))}
          </select>
        </div>
        {data && data.length && hasAvailabilities() ? (
          <div className="mt-4 ">
            <p>Select a Time</p>
            <div className="flex flex-wrap mt-2 lg:max-w-sm gap-3">
              {data.map((time) => {
                return time.available ? (
                  <Link
                    key={time.time}
                    className="bg-red-600 cursor-pointer p-2 w-24 text-center text-white  rounded "
                    href={`/reserve/${slug}?date=${day}T${time.time}&partySize=${partySize}`}
                  >
                    <p className="text-sm font-bold">
                      {convertToDisplayTime(time.time)}
                    </p>
                  </Link>
                ) : (
                  <p
                    key={time.time}
                    className="bg-gray-300 p-2 w-24 rounded "
                  ></p>
                )
              })}
            </div>
          </div>
        ) : (
          <div>
            <p className="text-center text-lg font-semibold text-red-600">
              There is no tables available
            </p>
          </div>
        )}
      </div>
    </section>
  )
}

export default MakeAReservation
