import { CartItemContainer, Details, Name } from "./cart-item.styles";

const CartItem = ({cartItem}) => {
    const { name, imageUrl, price, quantity } = cartItem
    return (
        <CartItemContainer>
            <img src={imageUrl} alt={name} />
            <Details>
                <Name>{name}</Name>
                <span className="price">{ quantity } x {`$${price}`}</span>
            </Details>
        </CartItemContainer>
    )
}

export default CartItem;