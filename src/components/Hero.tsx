import SearchBar from './SearchBar'

const Hero = ({
  children,
  title = '',
}: {
  title?: string
  children?: React.ReactNode
}) => {
  return (
    <section className={`py-16 bg-gradient-to-r from-[#0f1f47] to-[#5f6984]`}>
      <div className="text-center">
        {title && (
          <h1 className="text-white text-5xl font-bold mb-10 sm:mb-5 h-20">
            {title}
          </h1>
        )}
        {children}
      </div>
    </section>
  )
}

export default Hero
