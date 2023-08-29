'use client'

import Link from 'next/link'
import { useAuthContext } from '@/context/AuthContext'
import Button from './Button'
import { SelectedUser } from '@/interfaces/SelectedUser'
import useAuth from '@/hooks/useAuth'
import { useState } from 'react'
import { Box, Modal } from '@mui/material'
import AuthModalContent from './AuthModalContent'

const AuthButtons = ({
  userData,
  handleClick,
}: {
  userData: SelectedUser | null
  handleClick: () => void
}) => (
  <>
    <Button handleClick={handleClick}>Logout</Button>
  </>
)

const LoadingIndicator = () => (
  <div className="border p-1 px-4 rounded animate-pulse bg-slate-200 w-28"></div>
)

const Navbar = () => {
  const { data, loadingSignIn: loading } = useAuthContext()
  const { signout } = useAuth()
  const [openSignIn, setOpenSignIn] = useState(false)
  const handleOpenSingIn = () => setOpenSignIn(true)
  const handleCloseSignIn = () => setOpenSignIn(false)

  const [openSignUp, setOpenSignUp] = useState(false)
  const handleOpenSingUp = () => setOpenSignUp(true)
  const handleCloseSignUp = () => setOpenSignUp(false)

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
  return (
    <nav className="container mx-auto p-2 flex justify-between">
      <Link href="/" className="font-bold text-gray-700 text-2xl">
        OpenTable
      </Link>
      <div className="flex">
        {loading && <LoadingIndicator />}
        {data && <AuthButtons handleClick={signout} userData={data} />}
        {!data && !loading && (
          <>
            <Button
              className="ml-3"
              type="primary"
              handleClick={handleOpenSingIn}
            >
              Sign In
            </Button>
            <Button
              className="ml-3"
              type="secondary"
              handleClick={handleOpenSingUp}
            >
              Sign Up
            </Button>
          </>
        )}

        <Modal
          open={openSignIn}
          onClose={handleCloseSignIn}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          <Box sx={style}>
            <AuthModalContent
              action={'sign-in'}
              handleClose={handleCloseSignIn}
            />
          </Box>
        </Modal>
        <Modal
          open={openSignUp}
          onClose={handleCloseSignUp}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          <Box sx={style}>
            <AuthModalContent
              action={'sign-up'}
              handleClose={handleCloseSignIn}
            />
          </Box>
        </Modal>
      </div>
    </nav>
  )
}

export default Navbar
