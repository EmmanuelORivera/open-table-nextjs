import Link from 'next/link'
import AuthModal from './AuthModal'

const Navbar = () => {
  return (
    <nav className="container mx-auto p-2 flex justify-between">
      <Link href="/" className="font-bold text-gray-700 text-2xl">
        OpenTable
      </Link>

      <div className="flex">
        <AuthModal action="sign-in" />
        <AuthModal action="sign-up" />
      </div>
    </nav>
  )
}

export default Navbar
