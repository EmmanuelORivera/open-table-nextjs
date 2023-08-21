import Form from '../components/Form'
import Header from '../components/Header'

const Reserve = ({
  params,
  searchParams,
}: {
  params: { slug: string }
  searchParams: { date: string; partySize: string }
}) => {
  return (
    <section>
      <div className="border-t h-screen">
        <div className="py-9 w-3/5 m-auto">
          <Header params={params} searchParams={searchParams} />
          <Form />
        </div>
      </div>
    </section>
  )
}

export default Reserve
