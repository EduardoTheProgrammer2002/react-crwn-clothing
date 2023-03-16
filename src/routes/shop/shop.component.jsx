import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { Route, Routes } from "react-router-dom";
import { setCategories } from "../../redux/categories/category.action";
import { getCollectionAndDocs } from "../../utils/firebase/firebase.utils";
import CategoriesPreview from "../categories-preview/categories-preview.component";
import Category from "../category/category.component";

const Shop = () => {
    const dispatch = useDispatch();

    useEffect(() => {
        const getCategories = async () => {
            const categories = await getCollectionAndDocs();
            dispatch(setCategories(categories));
        }
        getCategories();
    }, [])
    return (
        <Routes>
            <Route index element={<CategoriesPreview />} />
            <Route path=":category" element={<Category />} />
        </Routes>
    )
};

export default Shop;