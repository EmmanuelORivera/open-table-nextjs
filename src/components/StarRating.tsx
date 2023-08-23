import Star from './Star'

const StarRating = ({
  rating,
  setRating,
}: {
  rating: number
  setRating: React.Dispatch<React.SetStateAction<number>>
}) => {
  const hanldeRatingChange = (newRating: number) => {
    setRating(newRating)
  }
  return (
    <div className="flex items-center gap-1">
      {/* this is are hidden radio buttons*/}
      {[1, 2, 3, 4, 5].map((value) => (
        <input
          key={value}
          type="radio"
          id={`star${value}`}
          name="rating"
          value={value}
          className="hidden"
          onChange={() => hanldeRatingChange(value)}
        />
      ))}

      {[1, 2, 3, 4, 5].map((value) => (
        <label key={value} htmlFor={`star${value}`} className=" cursor-pointer">
          <Star type={value <= rating ? 'full' : 'empty'} />
        </label>
      ))}
    </div>
  )
}

export default StarRating
