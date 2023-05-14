import { createAction, handleActions } from 'redux-actions';
import createRequestSaga, { createRequestActionTypes } from '../lib/createRequestSaga';
import * as userAPI from '../api/user';
import { takeLatest } from 'redux-saga/effects';

const [USER, USER_SUCCESS, USER_FAILURE] = createRequestActionTypes('userInfo/user');

export const userInfoAPI = createAction(USER);

const userSaga = createRequestSaga(USER, userAPI.userInfo);
export function* userInfoSaga() {
    yield takeLatest(USER, userSaga);
}

export interface ResponseType {
    user: {
        id: number;
        career: string[];
        purpose: string[];
        createdAt: string;
        updatedAt: string;
        userRequiredInfoId: number;
        likes: number[];
        hits: number[];
    } | null;
    userError: {
        code: number;
        message: string;
    } | null;
}

const initialState: ResponseType = {
    user: null,
    userError: null,
};

const userInfo = handleActions(
    {
        [USER_SUCCESS]: (
            state: ResponseType = initialState,
            {
                payload: data,
            }: {
                payload: {
                    result: ResponseType['user'];
                };
            },
        ) => ({
            ...state,
            user: data.result,
            userError: null,
        }),
        [USER_FAILURE]: (
            state: ResponseType = initialState,
            { payload: error }: { payload: ResponseType['userError'] },
        ) => ({ ...state, userError: error }),
    },
    initialState,
);

export default userInfo;
