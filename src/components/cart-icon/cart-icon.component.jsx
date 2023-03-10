import { useContext } from "react";
import { CartContext } from "../../contexts/cart.context";

import { CartIconContainer, ShoppingIcon, ItemCount } from "./cart-icon.styles";

const CartIcon = () => {
    const { showDropdown, setShowDropdown } = useContext(CartContext);
    const {cartCount} = useContext(CartContext);

    const toggleCartDropdown = () => {
        setShowDropdown(!showDropdown);
    }

    return (
        <CartIconContainer onClick={toggleCartDropdown} >
            <ShoppingIcon />
            <ItemCount className="item-count">{cartCount}</ItemCount>
        </CartIconContainer>
    )
}

export default CartIcon;