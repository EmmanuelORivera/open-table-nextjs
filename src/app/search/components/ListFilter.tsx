import Link from 'next/link'
import { ListFilterType } from './SearchSideBar'

interface FilterItem {
  id: number
  name: string
}
interface Props {
  searchParams: { city?: string; cuisine?: string }
  filterType: ListFilterType
  items: FilterItem[]
}

const getQuery = (
  filterType: ListFilterType,
  item: FilterItem,
  searchParams: { city?: string; cuisine?: string }
) => {
  let key = ''
  if (ListFilterType.Cuisine === filterType) {
    key = 'cuisine'
  } else if (ListFilterType.Region === filterType) {
    key = 'city'
  }

  const query = { ...searchParams, [key]: item.name }

  return { query }
}
const ListFilter = ({ searchParams, filterType, items }: Props) => {
  return (
    <div className="border-b pb-4">
      <h2 className="mb-2">{filterType}</h2>
      {items.map((item) => {
        const { query } = getQuery(filterType, item, searchParams)

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
