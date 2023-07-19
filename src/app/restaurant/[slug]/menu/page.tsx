import Hero from '@/components/Hero'
import RestaurantTabs from '../components/RestaurantTabs'
import Menu from '../components/Menu'

const MenuPage = () => {
  return (
    <section className="bg-gray-100 min-h-screen">
      <div className="max-w-screen-2xl m-auto bg-white">
        <Hero title="Milestones Grill (Toronto)"></Hero>
        <div className="px-4 flex m-auto w-full max-w-screen-lg  justify-between items-start 0 -mt-11">
          <div className="bg-white w-[100%] rounded p-3 shadow text-sm">
            <RestaurantTabs />
            <Menu />
          </div>
        </div>
      </div>
    </section>
  )
}

export default MenuPage
