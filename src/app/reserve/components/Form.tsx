const Form = () => {
  return (
    <div className="mt-10 grid md:grid-cols-2 gap-4  w-full">
      <input
        type="text"
        className="border rounded p-3 w-full"
        placeholder="First name"
      />
      <input
        type="text"
        className="border rounded p-3 w-full"
        placeholder="Last name"
      />

      <input
        type="text"
        className="border rounded p-3 w-full"
        placeholder="Phone number"
      />
      <input
        type="text"
        className="border rounded p-3 w-full"
        placeholder="Email"
      />
      <input
        type="text"
        className="border rounded p-3 w-full"
        placeholder="Occasion (optional)"
      />
      <input
        type="text"
        className="border rounded p-3 w-full"
        placeholder="Requests (optional)"
      />
      <button className="md:col-span-2 bg-red-600 w-full p-3 text-white font-bold rounded disabled:bg-gray-300">
        Complete reservation
      </button>
      <p className="md:col-span-2 mt-4 text-sm">
        By clicking “Complete reservation” you agree to the OpenTable Terms of
        Use and Privacy Policy. Standard text message rates may apply. You may
        opt out of receiving text messages at any time.
      </p>
    </div>
  )
}

export default Form
