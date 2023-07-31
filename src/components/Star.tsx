import Image from 'next/image'

interface StarProps {
  type: 'full' | 'half' | 'empty'
}
const Star = ({ type }: StarProps) => {
  const starImageMap = {
    full: '/icons/full-star.png',
    half: '/icons/half-star.png',
    empty: '/icons/empty-star.png',
  }
  return (
    <Image
      src={starImageMap[type]}
      height={20}
      width={20}
      alt={`${type}-star`}
    />
  )
}

export default Star
