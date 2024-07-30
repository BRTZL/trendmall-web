import { getCookie } from "cookies-next"

export function isUserAuthenticatedClient() {
  const accessToken = getCookie("accessToken")

  return !!accessToken
}
