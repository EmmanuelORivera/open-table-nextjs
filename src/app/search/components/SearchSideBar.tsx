import { PrismaCuisineService } from '@/services/PrismaCuisineService'
import { PrismaLocationService } from '@/services/PrismaLocationService'
import ListFilter from './ListFilter'
import PriceFilter from './PriceFilter'

export enum ListFilterType {
  Region = 'Region',
  Cuisine = 'Cuisine',
}

const SearchSideBar = async ({
  searchParams,
}: {
  searchParams: { city?: string; cuisine?: string; price?: string }
}) => {
  {
    /* TODO: Display sidebar on mobile screen */
  }
  const locationService = PrismaLocationService.getInstance()
  const cuisineService = PrismaCuisineService.getInstance()
  const promiseLocations = locationService.fetchLocations()
  const promiseCuisines = cuisineService.fetchCuisines()

  const [locations, cuisines] = await Promise.all([
    promiseLocations,
    promiseCuisines,
  ])

  return (
    <div className="w-1/5 hidden sm:block">
      <ListFilter
        searchParams={searchParams}
        filterType={ListFilterType.Region}
        items={locations}
      />
      <ListFilter
        searchParams={searchParams}
        filterType={ListFilterType.Cuisine}
        items={cuisines}
      />
      <PriceFilter searchParams={searchParams} />
    </div>
  )
}

export default SearchSideBar
