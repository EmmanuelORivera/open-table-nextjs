import Link from 'next/link'
interface Props {
  searchParams: { city?: string; cuisine?: string }
  title: string
  items: { id: number; name: string }[]
  generateQuery: (
    locationOrCuisine: { id: number; name: string },
    searchParams: { city?: string; cuisine?: string }
  ) => { city?: string; cuisine?: string }
}

const ListFilter = ({ searchParams, title, items, generateQuery }: Props) => {
  return (
    <div className="border-b pb-4">
      <h2 className="mb-2">{title}</h2>
      {items.map((item) => {
        const query = generateQuery(item, searchParams)

        return (
          <p className="font-light text-reg capitalize" key={item.id}>
            <Link href={{ pathname: '/search', query }}>{item.name}</Link>
          </p>
        )
      })}
    </div>
  )
}

export default ListFilter
