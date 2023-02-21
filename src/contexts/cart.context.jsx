import { createContext, useReducer } from "react";
import { createAction } from "../utils/reducer/reducer.utils";

export const CartContext = createContext({
    isCartOpen: false,
    setIsCartOpen: () => null,
    cartItems: [],
    addItemToCart: () => null,
    removeItemToCart: () => null,
    clearItemFromCart: () => null,
    cartCount: 0,
    cartTotal: 0
});

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

const CART_REDUCER_TYPES = {
    SET_IS_CART_OPEN: "SET_SHOW_DROPDOWN",
    SET_CART_ITEMS: "SET_CART_ITEMS"
}

//CartReducer
const cartReducer = (state, action) => {
    const { type, payload } = action

    switch (type) {
        case CART_REDUCER_TYPES.SET_CART_ITEMS:
            return {
                ...state,
                ...payload
            }
        case CART_REDUCER_TYPES.SET_IS_CART_OPEN:
            return {
                ...state,
                isCartOpen: payload
            }
        default:
            throw new Error(`Type Error: ${type}`);
    }
}

const DEFAULT_CART_STATE = {
    isCartOpen: false,
    cartItems: [],
    cartCount: 0,
    cartTotal: 0
}


export const CartContextProvider = ({ children }) => {
    const [{ cartItems, cartCount, cartTotal, isCartOpen }, dispatch] = useReducer(cartReducer, DEFAULT_CART_STATE);

    const setIsCartOpen = (state) => {
        dispatch(
            createAction(CART_REDUCER_TYPES.SET_IS_CART_OPEN, state)
        )
    }

    const setCartItems = (newCartItems) => {
        //set the cartCount
        const newCartCount = newCartItems.reduce((total, item) => {
            return total + item.quantity;
        }, 0);

        const newCartTotal = newCartItems.reduce((total, item) => {
            return total + (item.price * item.quantity);
        }, 0);

        const payload = {
            cartCount: newCartCount,
            cartTotal: newCartTotal,
            cartItems: newCartItems
        }
        dispatch(
            createAction(CART_REDUCER_TYPES.SET_CART_ITEMS, payload)
        );
    }

    const addItemToCart = (itemToAdd) => {
        const cartItemsUpdate = addCartItem(cartItems, itemToAdd);
        setCartItems(cartItemsUpdate);
    }

    const removeItemToCart = (itemToRemove) => {
        const cartItemsUpdate = removeCartItem(cartItems, itemToRemove);
        setCartItems(cartItemsUpdate);
    }

    const clearItemFromCart = (itemToRemove) => {
        const cartItemsUpdate = clearCartItem(cartItems, itemToRemove)
        setCartItems(cartItemsUpdate);
    }

    const value = { isCartOpen, setIsCartOpen, cartItems, addItemToCart, removeItemToCart, cartCount, clearItemFromCart, cartTotal };

    return (
        <CartContext.Provider value={value}>
            {children}
        </CartContext.Provider>
    )
}
