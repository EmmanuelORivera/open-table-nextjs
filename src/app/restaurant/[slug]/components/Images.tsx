const Images = () => {
  return (
    <div>
      <h2 className="font-bold text-3xl mt-10 mb-7 border-b pb-5">5 photos</h2>
      <div className="grid grid-cols-2 md:grid-cols-4 grid-rows-[repeat(4,150px)] md:grid-rows-2  gap-1">
        <img
          className="rounded col-span-2 row-span-2 object-cover h-full w-full"
          src="https://resizer.otstatic.com/v2/photos/xlarge/3/41701449.jpg"
          alt=""
        />

        <img
          className="rounded h-full w-full object-cover"
          src="https://resizer.otstatic.com/v2/photos/xlarge/2/41701450.jpg"
          alt=""
        />
        <img
          className="rounded h-full w-full object-cover"
          src="https://resizer.otstatic.com/v2/photos/xlarge/2/41701452.jpg"
          alt=""
        />
        <img
          className="rounded h-full w-full object-cover"
          src="https://resizer.otstatic.com/v2/photos/xlarge/2/41701453.jpg"
          alt=""
        />
        <img
          className="rounded h-full w-full object-cover"
          src="https://resizer.otstatic.com/v2/photos/xlarge/2/41701454.jpg"
          alt=""
        />
      </div>
    </div>
  )
}

export default Images
