import Image from 'next/image'

const Images = ({ images }: { images: string[] }) => {
  const totalOfImages = images.length
  const titleText = totalOfImages === 1 ? 'photo' : 'photos'
  return (
    <div>
      <h2 className="font-bold text-3xl mt-10 mb-7 border-b pb-5">
        {totalOfImages} {titleText}
      </h2>
      <div className="grid grid-cols-2 md:grid-cols-4 grid-rows-[repeat(4,150px)] md:grid-rows-2  gap-1">
        {images.map((image, index) => (
          <Image
            width={1000}
            height={1000}
            key={'image' + index}
            className="rounded col-span-2 row-span-2 object-cover h-full w-full"
            src={image}
            alt={`restaurant image ${index + 1}`}
          />
        ))}
      </div>
    </div>
  )
}

export default Images
