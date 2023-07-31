'use client'

import iconError from '../../public/icons/error.png'
import Image from 'next/image'

const error = ({ error, reset }: { error: Error; reset: () => void }) => {
  return (
    <div className="h-screen bg-gray-200 flex flex-col justify-center items-center">
      <Image src={iconError} alt="error image" className="w-56 mb-8" />
      <div className="bg-white px-9 py-14 shadow rounded text-center">
        <h3 className="text-3xl font-bold">Ups... there was a problem!</h3>
        <p className="font-bold text-red-500 mb-4">
          {error.message || 'Something went wrong'}
        </p>
        <button
          className="rounded-full bg-blue-600 hover:bg-blue-700 text-white px-4 py-2"
          onClick={reset}
        >
          Try Again
        </button>
      </div>
    </div>
  )
}

export default error
