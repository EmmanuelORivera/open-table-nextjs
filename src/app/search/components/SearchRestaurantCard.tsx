import Link from 'next/link'

const SearchRestaurantCard = () => {
  return (
    <div className="flex border-b h-[1%] pb-3">
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
          <Link href="/restaurant/milestones-grill">View more information</Link>
        </div>
      </div>
    </div>
  )
}

export default SearchRestaurantCard
