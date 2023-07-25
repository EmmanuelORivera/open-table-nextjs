import RestaurantTabs from '../components/RestaurantTabs'
import Menu from '../components/Menu'
import { Metadata } from 'next'
import { PrismaRestaurantService } from '@/services/PrismaRestaurantService'

export const metadata: Metadata = {
  title: 'Menu of Milesones Grill | OpenTable',
}

const MenuPage = async ({ params }: { params: { slug: string } }) => {
  const restaurantService = PrismaRestaurantService.getInstance()
  const menuItems = await restaurantService.fetchRestaurantMenu(params.slug)
  return (
    <>
      <div className="px-4 flex m-auto w-full max-w-screen-lg  justify-between items-start 0 -mt-11">
        <div className="bg-white w-[100%] rounded p-3 shadow text-sm">
          <RestaurantTabs slug={params.slug} />
          <Menu menuItems={menuItems} />
        </div>
      </div>
    </>
  )
}

export default MenuPage
