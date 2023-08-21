'use client'

import Button from '@/components/Button'
import InputField from '@/components/InputField'
import useReservation from '@/hooks/useReservation'
import { useEffect, useState } from 'react'
import { ReservePageParams, ReserveSearchParams } from '../[slug]/page'

const Form = ({
  params,
  searchParams,
}: {
  params: ReservePageParams
  searchParams: ReserveSearchParams
}) => {
  const [inputs, setInputs] = useState({
    bookerFirstName: '',
    bookerLastName: '',
    bookerPhone: '',
    bookerEmail: '',
    bookerOccasion: '',
    bookerRequests: '',
  })

  const [disabled, setDisabled] = useState(true)

  const { error, loading, createReservation } = useReservation()

  const handleChangeInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputs({
      ...inputs,
      [e.target.name]: e.target.value,
    })
  }

  useEffect(() => {
    if (
      inputs.bookerFirstName &&
      inputs.bookerLastName &&
      inputs.bookerPhone &&
      inputs.bookerEmail
    ) {
      setDisabled(false)
    } else {
      setDisabled(true)
    }
  }, [inputs])

  const [day, time] = searchParams.date.split('T')

  const handleClick = async () => {
    const booking = await createReservation({
      slug: params.slug,
      partySize: searchParams.partySize,
      time,
      day,
      bookerFirstName: inputs.bookerFirstName,
      bookerLastName: inputs.bookerLastName,
      bookerEmail: inputs.bookerEmail,
      bookerOccasion: inputs.bookerOccasion,
      bookerPhone: inputs.bookerPhone,
      bookerRequests: inputs.bookerRequests,
    })
  }

  return (
    <div className="mt-10 grid md:grid-cols-2 gap-4  w-full">
      <InputField
        type="text"
        value={inputs.bookerFirstName}
        placeholder="First name"
        name="bookerFirstName"
        onChange={handleChangeInput}
      />

      <InputField
        type="text"
        value={inputs.bookerLastName}
        placeholder="Last name"
        name="bookerLastName"
        onChange={handleChangeInput}
      />
      <InputField
        type="text"
        value={inputs.bookerPhone}
        placeholder="Phone number"
        name="bookerPhone"
        onChange={handleChangeInput}
      />

      <InputField
        type="text"
        value={inputs.bookerEmail}
        placeholder="Email"
        name="bookerEmail"
        onChange={handleChangeInput}
      />

      <InputField
        type="text"
        value={inputs.bookerOccasion}
        placeholder="Occasion (optional)"
        name="bookerOccasion"
        onChange={handleChangeInput}
      />

      <InputField
        type="text"
        value={inputs.bookerRequests}
        placeholder="Occasion (optional)"
        name="bookerRequests"
        onChange={handleChangeInput}
      />

      <Button
        className="md:col-span-2 w-full font-bold"
        type="action"
        handleClick={handleClick}
        disabled={disabled}
      >
        Complete reservation
      </Button>
      <p className="md:col-span-2 mt-4 text-sm">
        By clicking “Complete reservation” you agree to the OpenTable Terms of
        Use and Privacy Policy. Standard text message rates may apply. You may
        opt out of receiving text messages at any time.
      </p>
    </div>
  )
}

export default Form
