import { createSelector } from "reselect";
import { CategoriesState } from "./category.reducer";
import { CategoriesMap } from "./category.types";

const SelectCategoriesReducer = (state):CategoriesState => state.categories

const categoriesSelector = createSelector(
    [SelectCategoriesReducer],
    (categories) => categories.categories
)

export const isLoadingSelector = createSelector(
    [SelectCategoriesReducer],
    (categories) => categories.isLoading
)

export const categoriesMapSelector = createSelector(
    [categoriesSelector],
    (categoriesMap): CategoriesMap => categoriesMap.reduce((acc, categories) => {
        const { title, items } = categories;
        acc[title.toLowerCase()] = items;
        return acc
    }, {} as CategoriesMap)
)