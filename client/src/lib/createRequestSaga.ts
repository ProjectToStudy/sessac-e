import { call, put } from 'redux-saga/effects';

export const createRequestActionTypes = (type: string) => {
    const SUCCESS = `${type}_SUCCESS`;
    const FAILURE = `${type}_FAILURE`;
    return [type, SUCCESS, FAILURE];
};

export default function createRequestSaga (type: string, request: any) {
    const SUCCESS = `${type}_SUCCESS`;
    const FAILURE = `${type}_FAILURE`;

    return function * (action: any): any {
        try {
            const response = yield call(request, action.payload);
            yield put({
                type: SUCCESS,
                payload: response.data,
            });
        } catch (e: any) {
            yield put({
                type: FAILURE,
                payload: e.response.data,
                error: true,
            });
        }
    };
};
