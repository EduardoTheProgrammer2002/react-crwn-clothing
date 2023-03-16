import { useDispatch, useSelector } from "react-redux";
import { setCartIsOpen } from "../../redux/cart/cart.action";
import { selectCartCount, selectIsCartOpen } from "../../redux/cart/cart.selector";

import { CartIconContainer, ShoppingIcon, ItemCount } from "./cart-icon.styles";

const CartIcon = () => {
    const isCartOpen = useSelector(selectIsCartOpen);
    const cartCount = useSelector(selectCartCount);
    const dispatch = useDispatch();

    const toggleCartDropdown = () => {
        dispatch(setCartIsOpen(!isCartOpen));
    }

    return (
        <CartIconContainer onClick={toggleCartDropdown} >
            <ShoppingIcon />
            <ItemCount className="item-count">{cartCount}</ItemCount>
        </CartIconContainer>
    )
}

export default CartIcon;