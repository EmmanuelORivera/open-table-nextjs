export function parseQueryParameters(url: URL) {
  const day = url.searchParams.get('day')
  const time = url.searchParams.get('time')
  const partySize = url.searchParams.get('partySize')

  const pathSegment = url.pathname.split('/')
  const slug = pathSegment[pathSegment.length - 2]
  return { day, time, partySize, slug }
}
