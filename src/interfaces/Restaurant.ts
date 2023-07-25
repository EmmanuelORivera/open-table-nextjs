import { Cuisine, Item, Location, Price } from '@prisma/client'

export interface Restaurant {
  id: number
  name: string
  main_image: string
  cuisine: Cuisine
  location: Location
  price: Price
  slug: string
}

export interface RestaurantBySlug {
  id: number
  name: string
  images: string[]
  description: string
  slug: string
}

export interface RestaurantMenu {
  items: Item[]
}
