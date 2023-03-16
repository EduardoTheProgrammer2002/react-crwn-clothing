import { useDispatch, useSelector } from "react-redux";
import { addItemToCart, clearItemFromCart, removeItemToCart } from "../../redux/cart/cart.action";
import { selectCartItems } from "../../redux/cart/cart.selector";

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


const CheckoutItem = ({ cartItem }) => {
    const { name, imageUrl, price, quantity } = cartItem;
    const cartItems = useSelector(selectCartItems)
    const dispatch = useDispatch()

    const addItemHandler = () => {
        dispatch(addItemToCart(cartItems, cartItem));
    };

    const removeItemHandler = () => {
        dispatch(removeItemToCart(cartItems, cartItem));
    };

    const clearItemHandler = () => {
        dispatch(clearItemFromCart(cartItems, cartItem));
    }

    return (
        <CheckoutItemContainer>
            <ImageContainer>
                <img src={imageUrl} alt={name} />
            </ImageContainer>
            <Name> {name} </Name>
            <Quantity>
                <Arrow onClick={removeItemHandler}>&#x3c;</Arrow>
                <Value>{quantity}</Value>
                <Arrow onClick={addItemHandler}>&#x3e;</Arrow>
            </Quantity>
            <Price> {price} </Price>
            <RemoveButton onClick={clearItemHandler}>&#10005;</RemoveButton>
        </CheckoutItemContainer>
    )
}

export default CheckoutItem;