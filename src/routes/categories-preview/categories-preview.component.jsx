import { Fragment, useContext } from "react";
import { useSelector } from "react-redux";
import CategoryPreview from "../../components/category-preview/category-preview.component";
import Spinner from "../../components/spinner/spinner.component";
import { categoriesMapSelector, isLoadingSelector } from "../../redux/categories/category.selector";

const CategoriesPreview = () => {
    const categoriesMap = useSelector(categoriesMapSelector);
    const isLoading = useSelector(isLoadingSelector);

    return (
        <Fragment>
            {isLoading ? (<Spinner />) :
                (Object.keys(categoriesMap).map(title => {
                    const products = categoriesMap[title];

                    return (
                        <CategoryPreview
                            key={title}
                            title={title}
                            products={products}>
                        </CategoryPreview>
                    )
                }))
            }
        </Fragment>
    )
}

export default CategoriesPreview;