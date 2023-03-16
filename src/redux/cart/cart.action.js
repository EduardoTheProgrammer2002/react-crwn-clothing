import { createAction } from "../../utils/reducer/reducer.utils";
import { CART_REDUCER_TYPES } from "./cart.types";

const addCartItem = (cartItems, itemToAdd) => {

  // try to find the item
  const item = cartItems.find((item) => item.id === itemToAdd.id);


  //if found, increase the quantity
  if (item) {
    return cartItems.map((cartItem) => cartItem.id === item.id ?
      { ...cartItem, quantity: cartItem.quantity + 1 }
      : cartItem
    );
  }

  // if not found, add the item 
  //return a new array with the changes
  return [...cartItems, { ...itemToAdd, quantity: 1 }];
}

const clearCartItem = (cartItems, itemToRemove) => {
  return cartItems.filter((cartItem) => cartItem.id !== itemToRemove.id);
}

const removeCartItem = (cartItems, itemToRemove) => {
  //see if it exists
  const item = cartItems.find((item) => item.id === itemToRemove.id);

  //if exists verify if the quantity is greater than 1, and decrease the quantity
  if (item) {
    if (item.quantity <= 1) {
      return cartItems.filter((cartItem) => cartItem.id !== item.id);
    }
  }

  //return an updated array
  return cartItems.map((cartItem) => (
    cartItem.id === item.id ?
      { ...cartItem, quantity: cartItem.quantity - 1 } : cartItem
  )
  );
}

export const addItemToCart = (cartItems, itemToAdd) => {
  const cartItemsUpdate = addCartItem(cartItems, itemToAdd);
  return createAction(CART_REDUCER_TYPES.SET_CART_ITEMS, cartItemsUpdate);
}

export const removeItemToCart = (cartItems, itemToRemove) => {
  const cartItemsUpdate = removeCartItem(cartItems, itemToRemove);
  return createAction(CART_REDUCER_TYPES.SET_CART_ITEMS, cartItemsUpdate);
}

export const clearItemFromCart = (cartItems, itemToRemove) => {
  const cartItemsUpdate = clearCartItem(cartItems, itemToRemove)
  return createAction(CART_REDUCER_TYPES.SET_CART_ITEMS, cartItemsUpdate);
}

export const setCartIsOpen = (bool) =>
  createAction(CART_REDUCER_TYPES.SET_IS_CART_OPEN, bool);

