import Hero from '@/components/Hero'
import RestaurantTabs from '../components/RestaurantTabs'
import Menu from '../components/Menu'

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
