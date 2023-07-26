import Link from 'next/link'
import { ListFilterType } from './SearchSideBar'
interface Props {
  searchParams: { city?: string; cuisine?: string }
  filterType: ListFilterType
  items: { id: number; name: string }[]
}

const ListFilter = ({ searchParams, filterType, items }: Props) => {
  return (
    <div className="border-b pb-4">
      <h2 className="mb-2">{filterType}</h2>
      {items.map((item) => {
        let key = ''
        if (ListFilterType.Cuisine === filterType) {
          key = 'cuisine'
        } else if (ListFilterType.Region === filterType) {
          key = 'city'
        }

        const query = { ...searchParams, [key]: item.name }
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
