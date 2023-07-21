import { Cuisine, Location, Price } from '@prisma/client'

export interface Restaurant {
  id: number
  name: string
  main_image: string
  cuisine: Cuisine
  location: Location
  price: Price
  slug: string
}
