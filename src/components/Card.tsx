import React from 'react'

const Card = () => {
  return (
    <div className="pb-3 w-full max-w-[270px] rounded overflow-hidden border cursor-pointer">
      <img
        src="https://resizer.otstatic.com/v2/photos/wide-huge/2/31852905.jpg"
        alt=""
        className="w-full h-36 object-cover"
      />
      <div className="p-1">
        <h3 className="font-bold text-2xl mb-2">Milestones Grill</h3>
        <div className="flex items-start">
          <div className="flex mb-2">*****</div>
          <p className="ml-2">77 reviews</p>
        </div>
        <div className="flex font-light capitalize">
          <p className=" mr-3">Mexican</p>
          <p className="mr-3">$$$$</p>
          <p>Toronto</p>
        </div>
        <p className="text-sm mt-1 font-bold">Booked 3 times today</p>
      </div>
    </div>
  )
}

export default Card
