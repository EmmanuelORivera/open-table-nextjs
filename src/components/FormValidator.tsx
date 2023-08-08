'use client'

import { AuthInputs } from '@/interfaces/AuthInputs'
import { Action } from './AuthModal'
import { useEffect, useState } from 'react'
import Button from './Button'
import { renderContent } from '@/utils/authModalUtils'
import useAuth from '@/hooks/useAuth'

interface Props {
  inputs: AuthInputs
  action: Action
}
const FormValidator = ({ inputs, action }: Props) => {
  const [disabled, setDisabled] = useState(true)
  const { signin } = useAuth()

  useEffect(() => {
    if (action === 'sign-in') {
      if (inputs.password && inputs.email) {
        return setDisabled(false)
      }
    } else {
      if (
        inputs.firstName &&
        inputs.lastName &&
        inputs.email &&
        inputs.password &&
        inputs.city &&
        inputs.phone
      ) {
        return setDisabled(false)
      }
    }
    setDisabled(true)
  }, [inputs])

  const handleClick = () => {
    if (action === 'sign-in') {
      signin({ email: inputs.email, password: inputs.password })
    }
  }
  return (
    <Button
      handleClick={handleClick}
      disabled={disabled}
      className="md:col-span-2"
      type="action"
    >
      {renderContent(action, 'Sign In', 'Create Account')}
    </Button>
  )
}

export default FormValidator
