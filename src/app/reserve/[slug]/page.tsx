import Form from '../components/Form'
import Header from '../components/Header'

export interface ReservePageParams {
  slug: string
}

export interface ReserveSearchParams {
  date: string
  partySize: string
}

const Reserve = ({
  params,
  searchParams,
}: {
  params: ReservePageParams
  searchParams: ReserveSearchParams
}) => {
  return (
    <section>
      <div className="border-t h-screen">
        <div className="py-9 w-3/5 m-auto">
          <Header params={params} searchParams={searchParams} />
          <Form params={params} searchParams={searchParams} />
        </div>
      </div>
    </section>
  )
}

export default Reserve
