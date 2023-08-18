import { parseQueryParameters } from '@/utils/parseQueryParameters'
import { NextRequest, NextResponse } from 'next/server'

export async function GET(req: NextRequest) {
  const queryString = parseQueryParameters(new URL(req.url))
  return NextResponse.json(queryString)
}
