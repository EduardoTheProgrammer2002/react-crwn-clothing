import { useContext } from "react";
import { CartContext } from "../../contexts/cart.context";
import Button, { BUTTON_TYPE_CLASSES } from "../button/button.component";

//styles components
import { 
    ProductCardContainer,
    Footer,
    Name,
    Price
} from "./product-card.styles";

const ProductCard = ({product}) => {
    const {name, imageUrl, price} = product;
    const {addItemToCart} = useContext(CartContext)

    const addItem = () => {
        addItemToCart(product);
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

