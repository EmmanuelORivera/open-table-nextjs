'use client'

import { useState } from 'react'
import Box from '@mui/material/Box'
import Modal from '@mui/material/Modal'
import Button from './Button'
import AuthModalInputs from './AuthModalInputs'
import { renderContent } from '@/utils/authModalUtils'
import { useAuthContext } from '@/app/context/AuthContext'

const style = {
  position: 'absolute' as 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  minWidth: 300,
  maxWidth: 400,
  bgcolor: 'background.paper',
  boxShadow: 24,
  p: 4,
}

export type Action = 'sign-in' | 'sign-up'

export default function AuthModal({ action = 'sign-in' }: { action: Action }) {
  const { data, error, loading, setAuthState } = useAuthContext()
  const [open, setOpen] = useState(false)
  const handleOpen = () => setOpen(true)
  const handleClose = () => setOpen(false)
  const [inputs, setInputs] = useState({
    firstName: '',
    lastName: '',
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
    <div>
      <Button
        className="ml-3"
        type={
          renderContent(action, 'primary', 'secondary') as
            | 'primary'
            | 'secondary'
        }
        handleClick={handleOpen}
      >
        {renderContent(action, 'Sign In', 'Sign Up')}
      </Button>

      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
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
              <AuthModalInputs
                inputs={inputs}
                handleChangeInput={handleChangeInput}
                action={action}
              />
            </div>
          </div>
        </Box>
      </Modal>
    </div>
  )
}
