import Form from '../components/Form'
import Header from '../components/Header'

const Reserve = () => {
  return (
    <section className="bg-gray-100 min-h-screen">
      <div className="max-w-screen-2xl m-auto bg-white">
        <div className="border-t h-screen">
          <div className="py-9 w-3/5 m-auto">
            <Header />
            <Form />
          </div>
        </div>
      </div>
    </section>
  )
}

export default Reserve
