import { CART_REDUCER_TYPES } from "./cart.types"

const CART_INITIAL_STATE = {
  isCartOpen: false,
  cartItems: [],
  cartCount: 0,
  cartTotal: 0
}

//CartReducer
export const cartReducer = (state = CART_INITIAL_STATE, action) => {
  const { type, payload } = action

  switch (type) {
    case CART_REDUCER_TYPES.SET_CART_ITEMS:
      return {
        ...state,
        cartItems: payload
      }
    case CART_REDUCER_TYPES.SET_IS_CART_OPEN:
      return {
        ...state,
        isCartOpen: payload
      }
    default:
      return state
  }
}
