'use client'

import Button from '@/components/Button'
import InputField from '@/components/InputField'
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
