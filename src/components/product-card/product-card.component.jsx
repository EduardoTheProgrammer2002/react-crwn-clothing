import { useDispatch, useSelector } from "react-redux";
import { addItemToCart } from "../../redux/cart/cart.action";
import { selectCartItems } from "../../redux/cart/cart.selector";
import Button, { BUTTON_TYPE_CLASSES } from "../button/button.component";

//styles components
import {
    ProductCardContainer,
    Footer,
    Name,
    Price
} from "./product-card.styles";

const ProductCard = ({ product }) => {
    const { name, imageUrl, price } = product;
    const cartItems = useSelector(selectCartItems)
    const dispatch = useDispatch()

    const addItem = () => {
        dispatch(addItemToCart(cartItems, product));
    }
    return (
        <ProductCardContainer>
            <img src={imageUrl} alt={name} />
            <Footer>
                <Name>{name}</Name>
                <Price>{price}</Price>
            </Footer>
            <Button buttonType={BUTTON_TYPE_CLASSES.inverted} onClick={addItem}>Add to cart</Button>
        </ProductCardContainer>
    )
};

export default ProductCard

