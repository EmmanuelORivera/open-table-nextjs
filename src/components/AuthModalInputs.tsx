import { Button } from '@mui/material'
import { FormEvent } from 'react'
import { Action } from './AuthModal'

interface Props {
  inputs: {
    firstName: string
    lastName: string
    email: string
    phone: string
    city: string
    password: string
  }
  handleChangeInput: (e: React.ChangeEvent<HTMLInputElement>) => void
  action: Action
}

const AuthModalInputs = ({ inputs, handleChangeInput, action }: Props) => {
  const handleSubmit = (e: FormEvent) => {
    e.preventDefault()
  }
  return (
    <div>
      <form
        onSubmit={handleSubmit}
        className="my-3 grid grid-cols-1 md:grid-cols-2 gap-3 text-sm"
      >
        {action === 'sign-in' && (
          <>
            <label className="">
              First Name
              <input
                type="text"
                value={inputs.firstName}
                name="firstName"
                onChange={handleChangeInput}
                className="border rounded px-2 py-3 w-full"
              />
            </label>

            <label>
              Last Name
              <input
                type="text"
                value={inputs.lastName}
                onChange={handleChangeInput}
                name="lastName"
                className="border rounded px-2 py-3 w-full"
              />
            </label>
          </>
        )}

        <label className="md:col-span-2">
          Email
          <input
            type="email"
            value={inputs.email}
            name="email"
            onChange={handleChangeInput}
            className="border rounded px-2 py-3 w-full"
          />
        </label>

        {action === 'sign-in' && (
          <>
            <label className="">
              Phone
              <input
                type="text"
                value={inputs.phone}
                name="phone"
                onChange={handleChangeInput}
                className="border rounded px-2 py-3 w-full"
              />
            </label>

            <label className="">
              City
              <input
                type="text"
                value={inputs.city}
                name="city"
                onChange={handleChangeInput}
                className="border rounded px-2 py-3 w-full"
              />
            </label>
          </>
        )}

        <label className="md:col-span-2">
          Password
          <input
            type="password"
            value={inputs.password}
            name="password"
            onChange={handleChangeInput}
            className="border rounded px-2 py-3 w-full"
          />
        </label>

        <Button className="md:col-span-2" type="submit" variant="contained">
          Sign In
        </Button>
      </form>
    </div>
  )
}

export default AuthModalInputs
