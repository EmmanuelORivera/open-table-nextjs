const Reserve = () => {
  return (
    <section className="bg-gray-100 min-h-screen">
      <div className="max-w-screen-2xl m-auto bg-white">
        <div className="border-t h-screen">
          <div className="py-9 w-3/5 m-auto">
            {/* HEADER */}
            <div>
              <h3 className="font-bold hidden md:block">You're almost done!</h3>
              <div className="mt-5 flex gap-4">
                <img
                  src="https://images.otstatic.com/prod1/49153814/2/medium.jpg"
                  alt=""
                  className="w-32 h-18 rounded hidden md:block"
                />
                <div className="">
                  <h1 className="text-3xl font-bold">
                    Aiāna Restaurant Collective
                  </h1>
                  <div className="flex mt-3">
                    <p className="mr-6">Tues, 22, 2023</p>
                    <p className="mr-6">7:30 PM</p>
                    <p className="mr-6">3 people</p>
                  </div>
                </div>
              </div>
            </div>
            {/* HEADER */} {/* FORM */}
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
                By clicking “Complete reservation” you agree to the OpenTable
                Terms of Use and Privacy Policy. Standard text message rates may
                apply. You may opt out of receiving text messages at any time.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Reserve
