import { createAction, handleActions } from 'redux-actions';
import { takeLatest } from 'redux-saga/effects';
import produce from 'immer';
import createRequestSaga, { createRequestActionTypes } from '../lib/createRequestSaga';
import * as userAPI from '../api/user';

const INITIALIZE_KEY = 'user/INITIALIZE_KEY';
const IS_SIGNING = 'user/IS_SIGNING';
const [CERT_SEND, CERT_SEND_SUCCESS, CERT_SEND_FAILURE] = createRequestActionTypes('user/CERT_SEND');
const [CERT_CHECK, CERT_CHECK_SUCCESS, CERT_CHECK_FAILURE] = createRequestActionTypes('user/CERT_CHECK');
const [LOGIN, LOGIN_SUCCESS, LOGIN_FAILURE] = createRequestActionTypes('user/LOGIN');
const [JOIN, JOIN_SUCCESS, JOIN_FAILURE] = createRequestActionTypes('user/JOIN');

export const initializeKey = createAction(INITIALIZE_KEY, (key: string) => key);
export const setIsSigning = createAction(IS_SIGNING, (value: boolean) => value);
export const certSendAPI = createAction(CERT_SEND, (phone: string) => (phone));
export const certCheckAPI = createAction(CERT_CHECK, ({ phone, certificationNumber }: { phone: string, certificationNumber: string }) => ({ phone, certificationNumber }));
export const loginAPI = createAction(LOGIN, (phone: string) => (phone));
export const joinAPI = createAction(JOIN, (phone: string) => (phone));

const certSendSaga = createRequestSaga(CERT_SEND, userAPI.certSend);
const certCheckSaga = createRequestSaga(CERT_CHECK, userAPI.certCheck);
const loginSaga = createRequestSaga(LOGIN, userAPI.login);
const joinSaga = createRequestSaga(JOIN, userAPI.join);
export function * userSaga () {
    yield takeLatest(CERT_SEND, certSendSaga);
    yield takeLatest(CERT_CHECK, certCheckSaga);
    yield takeLatest(LOGIN, loginSaga);
    yield takeLatest(JOIN, joinSaga);
}

export interface ResponseType {
    isSigning: boolean;
    certSend: string | null;
    certSendError: any;
    certCheck: {
        message: string;
        result: string;
        content: object;
    } | null;
    certCheckError: {
        message: string;
        result: string;
        content: object;
    } | null;
    login: {
        code: number;
        message: string;
        result: object;
    } | null;
    loginError: {
        code: number;
        message: string;
    } | null;
    join: {
        code: number;
        message: string;
        result: object;
    } | null;
    joinError: {
        code: number;
        message: string;
    } | null;
}
const initialState: ResponseType = {
    isSigning: false,
    certSend: null,
    certSendError: null,
    certCheck: null,
    certCheckError: null,
    login: null,
    loginError: null,
    join: null,
    joinError: null,
};

const user = handleActions(
    {
        [INITIALIZE_KEY]: (state: ResponseType = initialState, { payload: key }: { payload: string }) => produce(state, draft => {
            // @ts-expect-error
            draft[key] = initialState[key]
        }),
        [IS_SIGNING]: (state: ResponseType = initialState, { payload: isSigning }: { payload: ResponseType['isSigning']}) => ({ ...state, isSigning }),
        [CERT_SEND_SUCCESS]: (state: ResponseType = initialState, { payload: certSend }: { payload: ResponseType['certSend'] }) => ({ ...state, certSend, certSendError: null }),
        [CERT_SEND_FAILURE]: (state: ResponseType = initialState, { payload: error }: { payload: any }) => ({ ...state, certSendError: error }),
        [CERT_CHECK_SUCCESS]: (state: ResponseType = initialState, { payload: certCheck }: { payload: ResponseType['certCheck'] }) => ({ ...state, certCheck, certCheckError: null }),
        [CERT_CHECK_FAILURE]: (state: ResponseType = initialState, { payload: error }: { payload: ResponseType['certCheckError'] }) => ({ ...state, certCheckError: error }),
        [LOGIN_SUCCESS]: (state: ResponseType = initialState, { payload: login }: { payload: ResponseType['login'] }) => ({ ...state, login, loginError: null }),
        [LOGIN_FAILURE]: (state: ResponseType = initialState, { payload: error }: { payload: ResponseType['loginError'] }) => ({ ...state, loginError: error }),
        [JOIN_SUCCESS]: (state: ResponseType = initialState, { payload: join }: { payload: ResponseType['join'] }) => ({ ...state, join, joinError: null }),
        [JOIN_FAILURE]: (state: ResponseType = initialState, { payload: error }: { payload: ResponseType['joinError'] }) => ({ ...state, joinError: error }),
    },
    initialState,
);

export default user;
