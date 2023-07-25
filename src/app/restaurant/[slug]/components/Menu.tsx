import MenuCard from './MenuCard'
import Title from './Title'
import { RestaurantMenu } from '@/interfaces/Restaurant'

const Menu = ({ menuItems }: { menuItems: RestaurantMenu }) => {
  return (
    <div className="bg-white mt-5">
      <div>
        <Title className="mb-7" title="Menu" />
        <div className="md:grid md:grid-cols-2 gap-3">
          {menuItems.items.length ? (
            menuItems.items.map((item) => (
              <MenuCard item={item} key={item.id} />
            ))
          ) : (
            <p>This Restaurant does not have a menu</p>
          )}
        </div>
      </div>
    </div>
  )
}

export default Menu
