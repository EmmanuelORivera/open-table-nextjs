import Hero from '@/components/Hero'
import SearchBar from '@/components/SearchBar'

const Search = () => {
  return (
    <article className="bg-gray-100 text-sm">
      <div className="max-w-screen-2xl m-auto bg-white">
        <Hero>
          <SearchBar />
        </Hero>
        <div className="sm:flex  gap-10 container max-w-7xl mx-auto p-3">
          {/* TODO: Display this option on mobile screen */}
          <div className="w-1/5 hidden sm:block">
            <div className="border-b pb-4">
              <h1 className="mb-2">Region</h1>
              <p className="font-light text-reg">Toronto</p>
              <p className="font-light text-reg">Ottawa</p>
              <p className="font-light text-reg">Montreal</p>
              <p className="font-light text-reg">Hamilton</p>
              <p className="font-light text-reg">Kingston</p>
              <p className="font-light text-reg">Niagara</p>
            </div>
            <div className="border-b pb-4 mt-3">
              <h1 className="mb-2">Cuisine</h1>
              <p className="font-light text-reg">Mexican</p>
              <p className="font-light text-reg">Italian</p>
              <p className="font-light text-reg">Chinese</p>
            </div>
            <div className="mt-3 pb-4">
              <h1 className="mb-2">Price</h1>
              <div className="flex">
                <button className="border w-full text-reg font-light rounded-l p-2">
                  $
                </button>
                <button className="border-r border-t border-b w-full text-reg font-light p-2">
                  $$
                </button>
                <button className="border-r border-t border-b w-full text-reg font-light p-2 rounded-r">
                  $$$
                </button>
              </div>
            </div>
          </div>
          <div className="">
            <div className="flex border-b  pb-3">
              <img
                src="https://images.otstatic.com/prod1/49153814/2/medium.jpg"
                alt=""
                className="w-full h-full min-w-[90px] min-h-[90px] max-w-[205px] max-h-[205px]  object-cover rounded"
              />
              <div className="w-full pl-5">
                <h2 className="text-lg text-[#247f9e] font-semibold">
                  Aiāna Restaurant Collective
                </h2>
                <div className="flex items-start">
                  <div className="flex mb-2">*****</div>
                  <p className="ml-2 font-medium">Awesome</p>
                </div>
                <div className="mb-9">
                  <div className="font-light  ">
                    <p className="mr-4">$$$</p>
                    <p className="mr-4">Mexican</p>
                    <p className="mr-4">Ottawa</p>
                  </div>
                </div>
                <div className="text-red-600">
                  <a href="">View more information</a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </article>
  )
}

export default Search
