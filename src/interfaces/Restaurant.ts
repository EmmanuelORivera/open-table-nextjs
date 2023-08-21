import { Cuisine, Item, Location, Price, Review, Table } from '@prisma/client'

export interface Restaurant {
  id: number
  name: string
  main_image: string
  cuisine: Cuisine
  location: Location
  price: Price
  slug: string
  reviews: Review[]
}

export interface RestaurantBySlug {
  id: number
  name: string
  images: string[]
  description: string
  slug: string
  reviews: Review[]
  open_time: string
  close_time: string
  main_image: string
}

export interface RestaurantMenu {
  items: Item[]
}

export interface RestaurantWithTables {
  id: number
  table: Table[]
  open_time: string
  close_time: string
}
