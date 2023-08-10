'use client'

import { useState } from 'react'
import Box from '@mui/material/Box'
import Modal from '@mui/material/Modal'
import Button from './Button'
import { renderContent } from '@/utils/authModalUtils'
import AuthModalContent from './AuthModalContent'

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
  const [open, setOpen] = useState(false)
  const handleOpen = () => setOpen(true)
  const handleClose = () => setOpen(false)
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
          <AuthModalContent action={action} handleClose={handleClose} />
        </Box>
      </Modal>
    </div>
  )
}
