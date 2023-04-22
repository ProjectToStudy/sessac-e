import createRequestSaga, { createRequestActionTypes } from '../lib/createRequestSaga'
import { createAction, handleActions } from 'redux-actions'
import { takeLatest } from 'redux-saga/effects'
import * as studyAPI from '../api/study'

const [GET_CATEGORY_LIST, GET_CATEGORY_LIST_SUCCESS, GET_CATEGORY_LIST_FAILURE] = createRequestActionTypes('study/GET_CATEGORY_LIST')

export const categoryListAPI = createAction(GET_CATEGORY_LIST,);

const getCategoryListSaga = createRequestSaga(GET_CATEGORY_LIST, studyAPI.getCategory)
export function * studySaga () {
  yield takeLatest(GET_CATEGORY_LIST, getCategoryListSaga)
}

export interface ResponseType {
  categoryList: any;
  categoryListError: any;
}

const initialState: ResponseType = {
    categoryList: [],
    categoryListError: null,
}

const study = handleActions(
    {
      [GET_CATEGORY_LIST_SUCCESS]: (state: ResponseType = initialState, { payload: data }: { payload: ResponseType['categoryList'] }) => ({ ...state, categoryList: data.result, categoryListError: null }),
      [GET_CATEGORY_LIST_FAILURE]: (state: ResponseType = initialState, { payload: error }: { payload: ResponseType['categoryListError'] }) => ({ ...state, categoryListError: error })
    },
    initialState,
);

export default study;
