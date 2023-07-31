import Link from 'next/link'
import LoginModal from './LoginModal'

const Navbar = () => {
  return (
    <nav className="container mx-auto p-2 flex justify-between">
      <Link href="/" className="font-bold text-gray-700 text-2xl">
        OpenTable
      </Link>

      <div className="flex">
        <LoginModal action="sign-in" />
        <LoginModal action="sign-up" />
      </div>
    </nav>
  )
}

export default Navbar
