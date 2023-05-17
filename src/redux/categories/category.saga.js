import { all, call, takeLatest, put } from 'redux-saga/effects'
import { getCollectionAndDocs } from "../../utils/firebase/firebase.utils";
import { fetchCategoriesFailed, fetchCategoriesSuccess } from "./category.action";
import { CATEGORIES_ACTION_TYPES } from './category.types';

export function* FetchCategoriesAsync() {
  try {
    const categories = yield call(getCollectionAndDocs, 'categories');
    console.log(categories)
    yield put(fetchCategoriesSuccess(categories))
  } catch (error) {
    yield put(fetchCategoriesFailed(error))
  }
}
// comment 
export function* onFetchCategories() {
  yield takeLatest(CATEGORIES_ACTION_TYPES.FETCH_CATEGORIES_START, FetchCategoriesAsync)
}

export function* categoriesSaga() {
  yield all([call(onFetchCategories)])
}