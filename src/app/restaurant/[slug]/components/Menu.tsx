import MenuCard from './MenuCard'
import Title from './Title'

const Menu = () => {
  return (
    <div className="bg-white mt-5">
      <div>
        <Title className="mb-7" title="Menu" />
        <MenuCard />
      </div>
    </div>
  )
}

export default Menu
