import { useContext } from "react";
import CheckoutItem from "../../components/checkout-item/checkout-item.component";
import { CartContext } from "../../contexts/cart.context";
import { CheckoutContainer, CheckoutHeader, HeaderBlock, Total } from "./checkout.styles";


const Checkout = () => {
    const { cartItems, cartTotal } = useContext(CartContext);

    return (
        <CheckoutContainer>
            <CheckoutHeader>
                <HeaderBlock>
                    <span>Product</span>
                </HeaderBlock>
                <HeaderBlock>
                    <span>Description</span>
                </HeaderBlock>
                <HeaderBlock>
                    <span>Quantity</span>
                </HeaderBlock>
                <HeaderBlock>
                    <span>Price</span>
                </HeaderBlock>
                <HeaderBlock>
                    <span>remove</span>
                </HeaderBlock>
            </CheckoutHeader>
            {
                cartItems.map((item) => {
                    return (
                        <CheckoutItem cartItem={item} />
                    )
                })
            }
            <Total>total: ${cartTotal}</Total>
        </CheckoutContainer>
    )
}

export default Checkout;