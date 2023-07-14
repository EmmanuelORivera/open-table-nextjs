const Hero = () => {
  return (
    <section className="py-20 bg-gradient-to-r from-[#0f1f47] to-[#5f6984]">
      <div className="text-center">
        <h1 className="text-white text-5xl font-bold mb-10 sm:mb-5">
          Find your table for any occasion
        </h1>
        {/* SEARCH BAR */}
        <div className="flex flex-col gap-4 w-[90%] max-w-3xl sm:flex-row mx-auto">
          <input
            className="rounded p-2 flex-grow"
            type="text"
            placeholder="State, city or town"
          />
          <button className="rounded bg-red-600  py-2 text-white sm:w-32 sm:max-w-md">
            Let's go
          </button>
        </div>
        {/* SEARCH BAR */}
      </div>
    </section>
  )
}

export default Hero
