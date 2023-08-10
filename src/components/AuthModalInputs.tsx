import { FormEvent } from 'react'
import { Action } from './AuthModal'
import { AuthInputs } from '@/interfaces/AuthInputs'
import InputField from './InputField'
import FormValidator from './FormValidator'

interface Props {
  inputs: AuthInputs
  handleChangeInput: (e: React.ChangeEvent<HTMLInputElement>) => void
  action: Action
  handleClose: () => void
}

const AuthModalInputs = ({
  inputs,
  handleChangeInput,
  action,
  handleClose,
}: Props) => {
  const handleSubmit = (e: FormEvent) => {
    e.preventDefault()
  }

  return (
    <div>
      <form
        onSubmit={handleSubmit}
        className="my-3 grid grid-cols-1 md:grid-cols-2 gap-3 text-sm"
      >
        {action === 'sign-up' && (
          <>
            <InputField
              label="First Name"
              type="text"
              value={inputs.firstName}
              name="firstName"
              onChange={handleChangeInput}
            />

            <InputField
              label="Last Name"
              type="text"
              value={inputs.lastName}
              name="lastName"
              onChange={handleChangeInput}
            />
          </>
        )}

        <InputField
          label="Email"
          type="email"
          value={inputs.email}
          name="email"
          onChange={handleChangeInput}
        />
        {action === 'sign-up' && (
          <>
            <InputField
              label="Phone"
              type="text"
              value={inputs.phone}
              name="phone"
              onChange={handleChangeInput}
            />

            <InputField
              label="City"
              type="text"
              value={inputs.city}
              name="city"
              onChange={handleChangeInput}
            />
          </>
        )}

        <InputField
          label="Password"
          type="password"
          value={inputs.password}
          name="password"
          onChange={handleChangeInput}
        />

        <FormValidator
          inputs={inputs}
          action={action}
          handleClose={handleClose}
        />
      </form>
    </div>
  )
}

export default AuthModalInputs
