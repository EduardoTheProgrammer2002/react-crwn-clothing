import { createContext, useEffect, useState } from "react";

export const CartContext = createContext({
    showDropdown: false,
    setShowDropdown: () => null,
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
    if(item) {
        return cartItems.map((cartItem) => cartItem.id === item.id ? 
            {...cartItem, quantity: cartItem.quantity+1}
            : cartItem
        );
    }

    // if not found, add the item 
    //return a new array with the changes
    return [...cartItems, {...itemToAdd, quantity:1}];
}

const clearCartItem = (cartItems, itemToRemove) => {
    return cartItems.filter((cartItem) => cartItem.id !== itemToRemove.id);
}

const removeCartItem = (cartItems, itemToRemove) => {
    //see if it exists
    const item = cartItems.find((item) => item.id === itemToRemove.id);

    //if exists verify if the quantity is greater than 1, and decrease the quantity
    if(item) {
        if(item.quantity <= 1) {
            return cartItems.filter((cartItem) => cartItem.id !== item.id);
        }
    }

    //return an updated array
    return cartItems.map((cartItem) => (
            cartItem.id === item.id ? 
            {...cartItem, quantity: cartItem.quantity-1} : cartItem
        )
    );
}


export const CartContextProvider = ({children}) => {
    const [showDropdown, setShowDropdown] = useState(false);
    const [cartItems, setCartItems] = useState([]);
    const [cartCount, setCartCount] = useState(0);
    const [cartTotal, setCartTotal] = useState(0);

    useEffect(() => {
        const newCartCount = cartItems.reduce((total, item) => {
            return total + item.quantity;
        }, 0);
        setCartCount(newCartCount);
    }, [cartItems])

    useEffect(() => {
        const newCartTotal = cartItems.reduce((total, item) => {
            return total + (item.price * item.quantity);
        }, 0);
        setCartTotal(newCartTotal);
    }, [cartItems])

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

    const value = {showDropdown, setShowDropdown, cartItems, addItemToCart, removeItemToCart, cartCount, clearItemFromCart, cartTotal};

    return (
        <CartContext.Provider value={value}>
            {children}
        </CartContext.Provider>
    )
}
