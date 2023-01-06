import { createContext, useEffect, useState } from "react";

export const CartContext = createContext({
    showDropdown: false,
    setShowDropdown: () => null,
    cartItems: [],
    addItemToCart: () => null,
    cartCount: 0
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


export const CartContextProvider = ({children}) => {
    const [showDropdown, setShowDropdown] = useState(false);
    const [cartItems, setCartItems] = useState([]);
    const [cartCount, setCartCount] = useState(0);

    useEffect(() => {
        const newCartCount = cartItems.reduce((total, item) => {
            return total + item.quantity;
        }, 0);
        setCartCount(newCartCount);
    }, [cartItems])

    const addItemToCart = (itemToAdd) => {
        const cartItemsUpdate = addCartItem(cartItems, itemToAdd);
        setCartItems(cartItemsUpdate);
    }

    const value = {showDropdown, setShowDropdown, cartItems, addItemToCart, cartCount};

    return (
        <CartContext.Provider value={value}>
            {children}
        </CartContext.Provider>
    )
}
