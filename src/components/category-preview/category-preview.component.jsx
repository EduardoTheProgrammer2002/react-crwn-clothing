import { Link } from "react-router-dom";
import ProductCard from "../product-card/product-card.component";
import { CategoryPreviewContainer, Title, PreviewContainer } from "./category-preview.styles";



const CategoryPreview = ({title, products}) => {

    return (
        <CategoryPreviewContainer>
            <h2>
                <Link to={title}>
                    <Title>{ title.toUpperCase() }</Title>
                </Link>
            </h2>    

            <PreviewContainer>
                {
                    products
                        .filter((_, indx) => indx < 4) 
                        .map((product) => (
                            <ProductCard key={product.id} product={product}/>
                        ))
                }
            </PreviewContainer>
        </CategoryPreviewContainer>
    )
}

export default CategoryPreview;