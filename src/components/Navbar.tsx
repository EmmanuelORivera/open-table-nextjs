'use client'

import Link from 'next/link'
import AuthModal from './AuthModal'
import { useAuthContext } from '@/context/AuthContext'
import Button from './Button'
import { SelectedUser } from '@/interfaces/SelectedUser'

const AuthButtons = ({ userData }: { userData: SelectedUser | null }) => (
  <>
    <Button handleClick={() => {}}>Logout</Button>
  </>
)

const LoadingIndicator = () => (
  <div className="border p-1 px-4 rounded animate-pulse bg-slate-200 w-28"></div>
)

const UnauthenticatedButtons = () => (
  <>
    <AuthModal action="sign-in" />
    <AuthModal action="sign-up" />
  </>
)

const Navbar = () => {
  const { data, loading } = useAuthContext()

  return (
    <nav className="container mx-auto p-2 flex justify-between">
      <Link href="/" className="font-bold text-gray-700 text-2xl">
        OpenTable
      </Link>
      <div className="flex">
        {loading && <LoadingIndicator />}
        {data && <AuthButtons userData={data} />}
        {!data && !loading && <UnauthenticatedButtons />}
      </div>
    </nav>
  )
}

export default Navbar
