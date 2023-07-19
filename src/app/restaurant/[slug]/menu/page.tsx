import Hero from '@/components/Hero'
import Link from 'next/link'
import RestaurantTabs from '../components/RestaurantTabs'

const MenuPage = () => {
  return (
    <section className="bg-gray-100 min-h-screen">
      <div className="max-w-screen-2xl m-auto bg-white">
        <Hero title="Milestones Grill (Toronto)"></Hero>
        {/* HEADER */} {/* DESCRIPTION PORTION */}
        <div className="px-4 flex m-auto w-full max-w-screen-lg  justify-between items-start 0 -mt-11">
          <div className="bg-white w-[100%] rounded p-3 shadow text-sm">
            <RestaurantTabs />
            {/* MENU */}
            <div className="bg-white mt-5">
              <div>
                <div className="mt-4 pb-1 mb-1">
                  <h1 className="font-bold text-4xl">Menu</h1>
                </div>
                <div className="flex flex-wrap justify-between">
                  {/* MENU CARD */}
                  <div className=" border rounded p-3 w-full md:w-[49%] mb-3">
                    <h3 className="font-bold text-lg">Surf and Turf</h3>
                    <p className="font-light mt-1 text-sm">
                      A well done steak with lobster and rice
                    </p>
                    <p className="mt-7">$80.00</p>
                  </div>
                  {/* MENU CARD */}
                </div>
              </div>
            </div>
            {/* MENU */}
          </div>
        </div>
        {/* DESCRIPTION PORTION */}
      </div>
    </section>
  )
}

export default MenuPage
