'use client'
import Button from '@/components/Button'
import { partySize } from '@/data'

const MakeAReservation = ({
  hideOnLargeScreen = false,
  className,
}: {
  hideOnLargeScreen?: boolean
  className?: string
}) => {
  const hiddenStyle = hideOnLargeScreen ? 'lg:hidden' : ''
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
          <input type="text" className="py-3 border-b font-light" />
        </div>

        <div className="flex flex-col w-full ">
          <label htmlFor="" className="font-medium">
            Time
          </label>
          <select name="" id="" className="py-3 border-b font-light">
            <option value="">7:30 AM</option>
            <option value="">9:30 AM</option>
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
