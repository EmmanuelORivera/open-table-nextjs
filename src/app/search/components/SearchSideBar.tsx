import { PrismaCuisineService } from '@/services/PrismaCuisineService'
import { PrismaLocationService } from '@/services/PrismaLocationService'
import ListFilter from './ListFilter'

const generateRegionQuery = (
  location: { id: number; name: string },
  searchParams: { city?: string; cuisine?: string }
) => {
  return searchParams.cuisine
    ? { city: location.name, cuisine: searchParams.cuisine }
    : { city: location.name }
}

const generateCuisineQuery = (
  cuisine: { id: number; name: string },
  searchParams: { city?: string; cuisine?: string }
) => {
  return searchParams.city
    ? { city: searchParams.city, cuisine: cuisine.name }
    : { cuisine: cuisine.name }
}

const SearchSideBar = async ({
  searchParams,
}: {
  searchParams: { city?: string; cuisine?: string }
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
        title="Region"
        items={locations}
        generateQuery={generateRegionQuery}
      />
      <ListFilter
        searchParams={searchParams}
        title="Cuisine"
        items={cuisines}
        generateQuery={generateCuisineQuery}
      />
      <div className="mt-3 pb-4">
        <h2 className="mb-2">Price</h2>
        <div className="flex">
          <button className="border w-full text-reg font-light rounded-l p-2">
            $
          </button>
          <button className="border-r border-t border-b w-full text-reg font-light p-2">
            $$
          </button>
          <button className="border-r border-t border-b w-full text-reg font-light p-2 rounded-r">
            $$$
          </button>
        </div>
      </div>
    </div>
  )
}

export default SearchSideBar
