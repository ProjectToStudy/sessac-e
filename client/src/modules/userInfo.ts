import { createAction, handleActions } from 'redux-actions';
import createRequestSaga, { createRequestActionTypes } from '../lib/createRequestSaga';
import * as userAPI from '../api/user';
import { takeLatest } from 'redux-saga/effects';

const [USER, USER_SUCCESS, USER_FAILURE] = createRequestActionTypes('userInfo/user');
const UPDATE_USER = 'user/UPDATE_USER';

export const userInfoAPI = createAction(USER);
export const updateUser = createAction(UPDATE_USER, ({ key, value }: { key: string; value: number[] }) => ({
    key,
    value,
}));

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
        [UPDATE_USER]: (
            state: ResponseType = initialState,
            { payload: { key, value } }: { payload: { key: string; value: number[] } },
        ) => ({ ...state, user: { ...state.user, [key]: value } }),
    },
    initialState,
);

export default userInfo;
