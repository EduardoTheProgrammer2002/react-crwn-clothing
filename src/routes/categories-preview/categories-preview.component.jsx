import { Fragment, useContext } from "react";
import { useSelector } from "react-redux";
import CategoryPreview from "../../components/category-preview/category-preview.component";
import { categoriesMapSelector } from "../../redux/categories/category.selector";

const CategoriesPreview = () => {
    const categoriesMap = useSelector(categoriesMapSelector);

    return (
        <Fragment>
            {
                Object.keys(categoriesMap).map(title => {
                    const products = categoriesMap[title];

                    return (
                        <CategoryPreview
                            key={title}
                            title={title}
                            products={products}>
                        </CategoryPreview>
                    )
                })
            }
        </Fragment>
    )
}

export default CategoriesPreview;