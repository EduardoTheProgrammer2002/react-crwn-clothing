import { Fragment, useContext, useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import ProductCard from "../../components/product-card/product-card.component";
import Spinner from "../../components/spinner/spinner.component";
import { categoriesMapSelector, isLoadingSelector } from "../../redux/categories/category.selector";

// styles components 
import { CategoryTitle, CategoryContainer } from "./category.styles";

const Category = () => {
    const { category } = useParams();
    console.log('render/re-rendering Category component');
    const categoriesMap = useSelector(categoriesMapSelector)
    const isLoading = useSelector(isLoadingSelector)
    const [products, setProducts] = useState(categoriesMap[category]);

    useEffect(() => {
        console.log('useEffect with setProducts fired');
        setProducts(categoriesMap[category]);
    }, [categoriesMap, category])

    return (
        <Fragment>
            <CategoryTitle>{category.toUpperCase()}</CategoryTitle>
            {isLoading ? (<Spinner />) :
                (<CategoryContainer>
                    {
                        products && products.map(product => (
                            <ProductCard product={product} key={product.id} />
                        ))
                    }
                </CategoryContainer>)
            }
        </Fragment>
    )
};

export default Category;