import { AUTHENTICATION_COOKIE_NAME } from "@/constants"
import { getCookie } from "cookies-next"

export function isUserAuthenticatedClient() {
  const accessToken = getCookie(AUTHENTICATION_COOKIE_NAME)

  return !!accessToken
}
