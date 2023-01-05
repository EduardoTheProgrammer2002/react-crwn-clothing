import "./cart-icon.styles.scss";
import { ReactComponent as ShoppingIcon } from "../../assets/shopping-bag.svg";
import { useContext } from "react";
import { CartContext } from "../../contexts/cart.context";

const CartIcon = () => {
    const { showDropdown, setShowDropdown } = useContext(CartContext);

    const toggleCartDropdown = () => {
        setShowDropdown(!showDropdown);
    }

    return (
        <div onClick={toggleCartDropdown} className="cart-icon-container">
            <ShoppingIcon className="shopping-icon"/>
            <span className="item-count">0</span>
        </div>
    )
}

export default CartIcon;