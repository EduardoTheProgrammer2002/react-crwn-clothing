import { createContext, useState } from "react";

export const CartContext = createContext({
    showDropdown: false,
    setShowDropdown: () => null
});


export const CartContextProvider = ({children}) => {
    const [showDropdown, setShowDropdown] = useState(false)
    const value = {showDropdown, setShowDropdown}

    return (
        <CartContext.Provider value={value}>
            {children}
        </CartContext.Provider>
    )
}
