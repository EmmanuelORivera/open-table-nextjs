const Hero = ({
  children,
  title = '',
}: {
  title?: string
  children?: React.ReactNode
}) => {
  const renderTitle = () => {
    const nameArray = title.split('-')
    nameArray[nameArray.length - 1] = `(${nameArray[nameArray.length - 1]})`

    return nameArray.join(' ')
  }
  return (
    <section className={`py-16 bg-gradient-to-r from-[#0f1f47] to-[#5f6984]`}>
      <div className="text-center">
        {title && (
          <h1 className="text-white text-4xl capitalize font-bold mb-10 sm:mb-5 h-20">
            {renderTitle()}
          </h1>
        )}
        {children}
      </div>
    </section>
  )
}

export default Hero
