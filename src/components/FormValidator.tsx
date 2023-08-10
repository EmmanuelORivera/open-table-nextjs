'use client'

import { AuthInputs } from '@/interfaces/AuthInputs'
import { Action } from './AuthModal'
import { useEffect, useState } from 'react'
import Button from './Button'
import { renderContent } from '@/utils/authModalUtils'
import useAuth from '@/hooks/useAuth'
import { SignInValidationStrategy } from '@/strategies/SignInValidationStrategy'
import { SignUpValidationStrategy } from '@/strategies/SignUpValidationStrategy'
import { ValidationStrategy } from '@/interfaces/ValidationStrategy'

interface Props {
  inputs: AuthInputs
  action: Action
  handleClose: () => void
}
const FormValidator = ({ inputs, action, handleClose }: Props) => {
  const [disabled, setDisabled] = useState(true)
  const { signin, signup } = useAuth()

  const validationStrategy: ValidationStrategy =
    action === 'sign-in'
      ? new SignInValidationStrategy()
      : new SignUpValidationStrategy()

  const isFormValid = validationStrategy.isValid(inputs)

  useEffect(() => {
    setDisabled(!isFormValid)
  }, [inputs, isFormValid])

  const handleClick = () => {
    if (action === 'sign-in') {
      signin({ email: inputs.email, password: inputs.password }, handleClose)
    } else {
      signup(inputs, handleClose)
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
