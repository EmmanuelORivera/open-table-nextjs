import Link from 'next/link'

const Navbar = () => {
  return (
    <nav className="container mx-auto p-2 flex justify-between">
      <Link href="/" className="font-bold text-gray-700 text-2xl">
        OpenTable
      </Link>

      <div className="flex">
        <button className="bg-blue-400 text-white border p-1 px-4 rounded mr-3">
          Sign in
        </button>
        <button className="border p-1 px-4 rounded">Sign up</button>
      </div>
    </nav>
  )
}

export default Navbar
