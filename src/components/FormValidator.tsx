'use client'

import { AuthInputs } from '@/interfaces/AuthInputs'
import { Action } from './AuthModal'
import { useEffect, useState } from 'react'
import Button from './Button'
import { renderContent } from '@/utils/authModalUtils'

interface Props {
  inputs: AuthInputs
  action: Action
}
const FormValidator = ({ inputs, action }: Props) => {
  const [disabled, setDisabled] = useState(true)
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

  return (
    <Button
      handleClick={() => {}}
      disabled={disabled}
      className="md:col-span-2"
      type="action"
    >
      {renderContent(action, 'Sign In', 'Create Account')}
    </Button>
  )
}

export default FormValidator
