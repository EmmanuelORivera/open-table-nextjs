import RestaurantTabs from '../components/RestaurantTabs'
import Menu from '../components/Menu'
import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Menu of Milesones Grill | OpenTable',
}

const MenuPage = () => {
  return (
    <>
      <div className="px-4 flex m-auto w-full max-w-screen-lg  justify-between items-start 0 -mt-11">
        <div className="bg-white w-[100%] rounded p-3 shadow text-sm">
          <RestaurantTabs />
          <Menu />
        </div>
      </div>
    </>
  )
}

export default MenuPage
