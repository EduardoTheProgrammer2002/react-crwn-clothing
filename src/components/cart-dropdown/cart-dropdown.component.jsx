import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { selectCartItems } from "../../redux/cart/cart.selector";
import Button from "../button/button.component";
import CartItem from "../cart-item/cart-item.component";
import { CartDropdownContainer, CartItemsContainer, EmptyMessage } from "./cart-dropdown.styles";

const CartDropdown = () => {
    const cartItems = useSelector(selectCartItems);
    const navigation = useNavigate();

    const goToCheckout = () => {
        navigation('/checkout')
    }

    return (
        <CartDropdownContainer>
            <CartItemsContainer className="cart-items">
                {
                    cartItems.length ?
                        (cartItems.map((cartItem) => <CartItem key={cartItem.id} cartItem={cartItem} />)) :
                        (<EmptyMessage>Your Cart is empty</EmptyMessage>)
                }
            </CartItemsContainer>
            <Button onClick={goToCheckout}>GO CHECKOUT</Button>
        </CartDropdownContainer>
    )
}

export default CartDropdown;