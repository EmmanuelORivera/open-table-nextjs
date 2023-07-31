import Image from 'next/image'
import iconError from '../../public/icons/error.png'

const NotFound = () => {
  return (
    <div>
      <div className="h-screen bg-gray-200 flex flex-col justify-center items-center">
        <Image src={iconError} alt="error image" className="w-56 mb-8" />
        <div className="bg-white px-9 py-14 shadow rounded text-center">
          <h3 className="text-3xl font-bold">Ups... there was a problem!</h3>
          <p className="font-bold text-red-500 mb-4">Page was not Found</p>
          <p className="mt-6 text-sm font-light">Error Code: 404</p>
        </div>
      </div>
    </div>
  )
}

export default NotFound
