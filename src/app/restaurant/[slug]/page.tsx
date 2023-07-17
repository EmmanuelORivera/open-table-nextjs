import Hero from '@/components/Hero'
import MakeAReservation from '@/components/MakeAReservation'

const RestaurantDetails = () => {
  return (
    <article className="bg-gray-100 min-h-screen">
      <div className="max-w-screen-2xl m-auto bg-white ">
        <Hero displaySearchBar={false}>Milestones Grill (Toronto)</Hero>
        {/* DESCRIPTION PORTION */}
        <div className="px-4 lg:grid lg:grid-cols-[repeat(2,minmax(200px,550px))] lg:gap-10 justify-center">
          <div className="-mt-11 mx-auto max-w-screen-md lg:max-w-screen-md">
            <div className="bg-white mx-auto rounded p-3 shadow text-sm">
              {/* RESAURANT NAVBAR */}
              <nav className="flex text-reg border-b pb-2">
                <a href="" className="mr-7">
                  {' '}
                  Overview{' '}
                </a>
                <a href="" className="mr-7">
                  {' '}
                  Menu{' '}
                </a>
              </nav>
              {/* RESAURANT NAVBAR */} {/* TITLE */}
              <div className="mt-4 border-b pb-6">
                <h1 className="font-bold text-5xl">Milesstone Grill</h1>
              </div>
              {/* TITLE */} {/* RATING */}
              <div className="flex items-end">
                <div className="ratings mt-2 flex items-center">
                  <p>*****</p>
                  <p className="text-reg ml-3">4.9</p>
                </div>
                <div>
                  <p className="text-reg ml-4">600 Reviews</p>
                </div>
              </div>
              {/* RATING */} {/* DESCRIPTION */}
              <div className="mt-4">
                <p className="font-medium">
                  The classics you love prepared with a perfect twist, all
                  served up in an atmosphere that feels just right. That’s the
                  Milestones promise. So, whether you’re celebrating a
                  milestone, making the most of Happy Hour or enjoying brunch
                  with friends, you can be sure that every Milestones experience
                  is a simple and perfectly memorable one.
                </p>
              </div>
              {/* DESCRIPTION */}
              {/* Make a reservation */}
              <MakeAReservation hideOnLargeScreen />
              {/* Make a reservation */}
              {/* IMAGES */}
              <div>
                <h2 className="font-bold text-3xl mt-10 mb-7 border-b pb-5">
                  5 photos
                </h2>
                <div className="grid grid-cols-2 md:grid-cols-4 grid-rows-[repeat(4,150px)] md:grid-rows-2  gap-1">
                  <img
                    className="rounded col-span-2 row-span-2 object-cover h-full w-full"
                    src="https://resizer.otstatic.com/v2/photos/xlarge/3/41701449.jpg"
                    alt=""
                  />

                  <img
                    className="rounded h-full w-full object-cover"
                    src="https://resizer.otstatic.com/v2/photos/xlarge/2/41701450.jpg"
                    alt=""
                  />
                  <img
                    className="rounded h-full w-full object-cover"
                    src="https://resizer.otstatic.com/v2/photos/xlarge/2/41701452.jpg"
                    alt=""
                  />
                  <img
                    className="rounded h-full w-full object-cover"
                    src="https://resizer.otstatic.com/v2/photos/xlarge/2/41701453.jpg"
                    alt=""
                  />
                  <img
                    className="rounded h-full w-full object-cover"
                    src="https://resizer.otstatic.com/v2/photos/xlarge/2/41701454.jpg"
                    alt=""
                  />
                </div>
              </div>
              {/* IMAGES */} {/* REVIEWS */}
              <div>
                <h1 className="font-bold text-3xl mt-10 mb-7 borber-b pb-5">
                  What 100 people are saying
                </h1>
                <div>
                  {/* REVIEW CARD */}
                  <div className="border-b pb-7 mb-7">
                    <div className="flex">
                      <div className="w-1/6 flex flex-col items-center">
                        <div className="rounded-full bg-blue-400 w-16 h-16 flex items-center justify-center">
                          <h2 className="text-white text-2xl">MJ</h2>
                        </div>
                        <p className="text-center">Micheal Jordan</p>
                      </div>
                      <div className="ml-10 w-5/6">
                        <div className="flex items-center">
                          <div className="flex mr-5">*****</div>
                        </div>
                        <div className="mt-5">
                          <p className="text-lg font-light">
                            Laurie was on top of everything! Slow night due to
                            the snow storm so it worked in our favor to have
                            more one on one with the staff. Delicious and well
                            worth the money.
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                  {/* REVIEW CARD */}
                </div>
              </div>
              {/* REVIEWS */}
            </div>
          </div>

          <div>
            <MakeAReservation className="fixed -my-11 bg-white rounded" />
          </div>
        </div>
        {/* DESCRIPTION PORTION */} {/* RESERVATION CARD PORTION */}{' '}
        {/* RESERVATION
    CARD PORTION */}
      </div>
    </article>
  )
}

export default RestaurantDetails
