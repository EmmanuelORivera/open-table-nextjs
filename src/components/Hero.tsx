import SearchBar from './SearchBar'

const Hero = ({
  children,
  displaySearchBar = true,
}: {
  children?: React.ReactNode
  displaySearchBar?: boolean
}) => {
  const sectionVerticalPadding = children ? 'py-20' : 'py-8'

  return (
    <section
      className={`${sectionVerticalPadding} bg-gradient-to-r from-[#0f1f47] to-[#5f6984]`}
    >
      <div className="text-center">
        {children && (
          <h1 className="text-white text-5xl font-bold mb-10 sm:mb-5">
            {children}
          </h1>
        )}
        {/* SEARCH BAR */}
        {displaySearchBar && <SearchBar />}
        {/* SEARCH BAR */}
      </div>
    </section>
  )
}

export default Hero
