export const AUTHENTICATION_COOKIE_NAME = "x-access-token"

export const Paths = {
  home: "/",
  login: "/login",
  register: "/register",
  account: "/account",
  productDetail: (productId: string) => `/product/${productId}`,
  cart: "/cart",
}

export const PLACEHOLDER_IMAGE = "https://via.placeholder.com/600x400/png"
