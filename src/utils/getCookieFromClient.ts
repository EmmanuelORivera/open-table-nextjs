export const getCookieFromClient = (name: string): string | undefined => {
  const myCookie = document.cookie
    .split('; ')
    .find((cookie) => cookie.startsWith(`${name}=`))

  if (myCookie) {
    return myCookie.split('=')[1]
  }
  return undefined
}
