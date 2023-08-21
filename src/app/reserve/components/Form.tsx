'use client'

import Button from '@/components/Button'
import { useEffect, useState } from 'react'

const Form = () => {
  const [inputs, setInputs] = useState({
    bookerFirstName: '',
    bookerLastName: '',
    bookerPhone: '',
    bookerEmail: '',
    bookerOccasion: '',
    bookerRequests: '',
  })

  const [disabled, setDisabled] = useState(true)

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

  return (
    <div className="mt-10 grid md:grid-cols-2 gap-4  w-full">
      <input
        type="text"
        name="bookerFirstName"
        onChange={handleChangeInput}
        value={inputs.bookerFirstName}
        className="border rounded p-3 w-full"
        placeholder="First name"
      />
      <input
        type="text"
        name="bookerLastName"
        onChange={handleChangeInput}
        value={inputs.bookerLastName}
        className="border rounded p-3 w-full"
        placeholder="Last name"
      />

      <input
        type="text"
        name="bookerPhone"
        onChange={handleChangeInput}
        value={inputs.bookerPhone}
        className="border rounded p-3 w-full"
        placeholder="Phone number"
      />
      <input
        type="text"
        name="bookerEmail"
        onChange={handleChangeInput}
        value={inputs.bookerEmail}
        className="border rounded p-3 w-full"
        placeholder="Email"
      />
      <input
        type="text"
        name="bookerOccasion"
        onChange={handleChangeInput}
        value={inputs.bookerOccasion}
        className="border rounded p-3 w-full"
        placeholder="Occasion (optional)"
      />
      <input
        type="text"
        name="bookerRequests"
        onChange={handleChangeInput}
        value={inputs.bookerRequests}
        className="border rounded p-3 w-full"
        placeholder="Requests (optional)"
      />
      <Button
        className="md:col-span-2 w-full font-bold"
        type="action"
        handleClick={() => {}}
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
