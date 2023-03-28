import { createSelector } from "reselect";

const SelectCategoriesReducer = (state) => state.categories

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
    (categoriesMap) => categoriesMap.reduce((acc, categories) => {
        const { title, items } = categories;
        acc[title.toLowerCase()] = items;
        return acc
    }, {})
)