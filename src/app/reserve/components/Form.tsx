'use client'

import Button from '@/components/Button'
import InputField from '@/components/InputField'
import useReservation from '@/hooks/useReservation'
import { useEffect, useState } from 'react'
import { ReservePageParams, ReserveSearchParams } from '../[slug]/page'
import { Alert, CircularProgress } from '@mui/material'
import { ReserveValidationStrategy } from '@/strategies/ReserveValidationStrategy'
import { ValidationStrategy } from '@/interfaces/ValidationStrategy'
import { ReserveFormInputs } from '@/interfaces/ReserveFormInputs'

const Form = ({
  params,
  searchParams,
}: {
  params: ReservePageParams
  searchParams: ReserveSearchParams
}) => {
  const [inputs, setInputs] = useState({
    first_name: '',
    last_name: '',
    phone: '',
    email: '',
    occasion: '',
    request: '',
  })

  const [didBook, setDidBook] = useState(false)
  const [disabled, setDisabled] = useState(true)

  const { error, loading, createReservation } = useReservation()

  const handleChangeInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputs({
      ...inputs,
      [e.target.name]: e.target.value,
    })
  }
  const reserveValidation: ValidationStrategy<ReserveFormInputs> =
    new ReserveValidationStrategy()

  const isFormValid = reserveValidation.isValid(inputs)

  useEffect(() => {
    setDisabled(!isFormValid)
  }, [inputs, isFormValid])

  const [day, time] = searchParams.date.split('T')

  const handleClick = async () => {
    const booking = await createReservation({
      slug: params.slug,
      partySize: searchParams.partySize,
      time,
      day,
      bookerFirstName: inputs.first_name,
      bookerLastName: inputs.last_name,
      bookerEmail: inputs.email,
      bookerOccasion: inputs.occasion,
      bookerPhone: inputs.phone,
      bookerRequests: inputs.request,
      setDidBook,
    })
  }

  return (
    <>
      {error && (
        <Alert severity="error" className="mt-8">
          {error}
        </Alert>
      )}
      <div className="mt-10 grid md:grid-cols-2 gap-4  w-full">
        {didBook ? (
          <div>
            <h1>You are all booked up</h1>
            <p>Enjoy your reservation</p>
          </div>
        ) : (
          <>
            <InputField
              type="text"
              value={inputs.first_name}
              placeholder="First name"
              name="first_name"
              onChange={handleChangeInput}
            />

            <InputField
              type="text"
              value={inputs.last_name}
              placeholder="Last name"
              name="last_name"
              onChange={handleChangeInput}
            />
            <InputField
              type="text"
              value={inputs.phone}
              placeholder="Phone number"
              name="phone"
              onChange={handleChangeInput}
            />

            <InputField
              type="text"
              value={inputs.email}
              placeholder="Email"
              name="email"
              onChange={handleChangeInput}
            />

            <InputField
              type="text"
              value={inputs.occasion}
              placeholder="Occasion (optional)"
              name="occasion"
              onChange={handleChangeInput}
            />

            <InputField
              type="text"
              value={inputs.request}
              placeholder="Request (optional)"
              name="request"
              onChange={handleChangeInput}
            />

            <Button
              className="md:col-span-2 w-full font-bold"
              type="action"
              handleClick={handleClick}
              disabled={disabled || loading}
            >
              {loading ? (
                <CircularProgress color="inherit" />
              ) : (
                'Complete reservation'
              )}
            </Button>
            <p className="md:col-span-2 mt-4 text-sm">
              By clicking “Complete reservation” you agree to the OpenTable
              Terms of Use and Privacy Policy. Standard text message rates may
              apply. You may opt out of receiving text messages at any time.
            </p>
          </>
        )}
      </div>
    </>
  )
}

export default Form
