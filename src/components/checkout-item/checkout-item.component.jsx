import { useContext } from "react";
import { CartContext } from "../../contexts/cart.context";
import "./checkout-item.styles.scss";

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
        <div className="checkout-item-container">
            <div className="image-container">
                <img src={imageUrl} alt={name} />
            </div>
            <span className="name"> { name } </span>
            <span className="quantity"> 
                <span className="arrow" onClick={removeItemHandler}>&#x3c;</span>
                <div className="value">{ quantity }</div> 
                <span className="arrow" onClick={addItemHandler}>&#x3e;</span>
            </span>
            <span className="price"> { price } </span>
            <div className="remove-button" onClick={clearItemHandler}>&#10005;</div>
        </div>
    )
}

export default CheckoutItem;