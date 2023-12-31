import { renderContent } from '@/utils/authModalUtils'
import { Action } from '@/types/Action'
import AuthModalInputs from './AuthModalInputs'
import { Alert, CircularProgress } from '@mui/material'
import { useAuthContext } from '@/context/AuthContext'
import { useState } from 'react'

const AuthModalContent = ({
  action,
  handleClose,
}: {
  action: Action
  handleClose: () => void
}) => {
  const { loadingSignIn, loadingSignUp, errorSignIn, errorSignUp } =
    useAuthContext()

  const loading = action === 'sign-in' ? loadingSignIn : loadingSignUp
  const error = action === 'sign-in' ? errorSignIn : errorSignUp

  const [inputs, setInputs] = useState({
    first_name: '',
    last_name: '',
    email: '',
    city: '',
    phone: '',
    password: '',
  })

  const handleChangeInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputs({
      ...inputs,
      [e.target.name]: e.target.value,
    })
  }

  return (
    <div className="p-2 h-[700px]">
      <div className="uppercase font-bold text-center pb-2 border-b mb-2">
        <p className="text-sm">
          {renderContent(action, 'Sign In', 'Create Account')}
        </p>
      </div>
      <div className="m-auto">
        <h2 className="text-2xl font-light text-center">
          {renderContent(
            action,
            'Log Into Your Account',
            'Create Your OpenTable Account'
          )}
        </h2>
        {loading ? (
          <div className="mt-8 flex justify-center">
            <CircularProgress />
          </div>
        ) : (
          <>
            {error && (
              <Alert severity="error" className="my-4">
                {error}
              </Alert>
            )}
            <AuthModalInputs
              inputs={inputs}
              handleChangeInput={handleChangeInput}
              action={action}
              handleClose={handleClose}
            />
          </>
        )}
      </div>
    </div>
  )
}

export default AuthModalContent
