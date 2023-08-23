import { PrismaReviewService } from '@/services/PrismaReviewService'
import { NextRequest, NextResponse } from 'next/server'

interface JsonRequestDate {
  first_name: string
  last_name: string
  rating: number
  text: string
  restaurantId: number
  userId: number
}
export async function POST(req: NextRequest) {
  const {
    first_name,
    last_name,
    rating,
    text,
    restaurantId,
    userId,
  }: JsonRequestDate = await req.json()

  const reviewService = PrismaReviewService.getInstance()

  const review = await reviewService.createReview(
    first_name,
    last_name,
    rating,
    text,
    restaurantId,
    userId
  )

  if (!review) {
    NextResponse.json(
      { errorMessage: 'There was a problem at the moment of create a review' },
      { status: 400 }
    )
  }
  return NextResponse.json(review)
}
