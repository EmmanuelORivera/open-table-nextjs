import Hero from '@/components/Hero'

const loading = () => {
  return (
    <section>
      <Hero />
      <div className="py-3 px-36 mt-10 flex flex-wrap justify-center">
        {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12].map((num) => (
          <div
            key={num}
            className="animate-pulse m-3 bg-slate-200 w-64 h-72 rounded overflow-hidden border cursor-pointer"
            style={{ animationDelay: `${num * 0.5}s`, animationDuration: '1s' }}
          ></div>
        ))}
      </div>
    </section>
  )
}

export default loading
