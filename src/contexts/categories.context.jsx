import { createContext, useEffect, useState } from "react";
import { getCollectionAndDocs } from "../utils/firebase/firebase.utils";

export const CategoriesContext = createContext({
    categoriesMap: {}
});

export const CategoriesContextProvider = ({children}) => {
    const [categoriesMap, setCategoriesMap] = useState({});
    const value = {categoriesMap};

    useEffect(() => {
        const getCategories = async () => {
            const categoryMap = await getCollectionAndDocs();
            setCategoriesMap(categoryMap);
        }
        getCategories();
    }, [])

    return (
        <CategoriesContext.Provider value={value}>
            {children}
        </CategoriesContext.Provider>
    )

}
