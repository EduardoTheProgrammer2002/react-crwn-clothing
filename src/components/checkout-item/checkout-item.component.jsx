import { useContext } from "react";
import { CartContext } from "../../contexts/cart.context";

// styles components
import { 
    CheckoutItemContainer,
    Name,
    Quantity,
    Arrow,
    Value,
    Price,
    RemoveButton,
    ImageContainer
} from "./checkout-item.styles";


const CheckoutItem = ({cartItem}) => {
    const { name, imageUrl, price, quantity } = cartItem;
    const {addItemToCart, removeItemToCart, clearItemFromCart} = useContext(CartContext);

    const addItemHandler = () => {
        addItemToCart(cartItem);
    };

    const removeItemHandler = () => {
        removeItemToCart(cartItem);
    };

    const clearItemHandler = () => {
        clearItemFromCart(cartItem);
    }

    return (
        <CheckoutItemContainer>
            <ImageContainer>
                <img src={imageUrl} alt={name} />
            </ImageContainer>
            <Name> { name } </Name>
            <Quantity> 
                <Arrow onClick={removeItemHandler}>&#x3c;</Arrow>
                <Value>{ quantity }</Value> 
                <Arrow onClick={addItemHandler}>&#x3e;</Arrow>
            </Quantity>
            <Price> { price } </Price>
            <RemoveButton onClick={clearItemHandler}>&#10005;</RemoveButton>
        </CheckoutItemContainer>
    )
}

export default CheckoutItem;