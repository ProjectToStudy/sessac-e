import { createAction, handleActions } from 'redux-actions';
import { takeLatest } from 'redux-saga/effects';
import createRequestSaga, { createRequestActionTypes } from '../lib/createRequestSaga';
import * as userAPI from '../api/user';

const IS_SIGNING = 'user/IS_SIGNING';
const [CERT_SEND, CERT_SEND_SUCCESS, CERT_SEND_FAILURE] = createRequestActionTypes('user/CERT_SEND');
const [CERT_CHECK, CERT_CHECK_SUCCESS, CERT_CHECK_FAILURE] = createRequestActionTypes('user/CERT_CHECK');

export const setIsSigning = createAction(IS_SIGNING, (value: boolean) => value);
export const certSendAPI = createAction(CERT_SEND, (phone: string) => (phone));
export const certCheckAPI = createAction(CERT_CHECK, ({ phone, certificationNumber }: { phone: string, certificationNumber: string }) => ({ phone, certificationNumber }));

const certSendSaga = createRequestSaga(CERT_SEND, userAPI.certSend);
const certCheckSaga = createRequestSaga(CERT_CHECK, userAPI.certCheck);
export function * userSaga () {
    yield takeLatest(CERT_SEND, certSendSaga);
    yield takeLatest(CERT_CHECK, certCheckSaga);
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
}
const initialState: ResponseType = {
    isSigning: false,
    certSend: null,
    certSendError: null,
    certCheck: null,
    certCheckError: null,
};

const user = handleActions(
    {
        [IS_SIGNING]: (state: ResponseType = initialState, { payload: isSigning }: { payload: ResponseType['isSigning']}) => ({ ...state, isSigning }),
        [CERT_SEND_SUCCESS]: (state: ResponseType = initialState, { payload: certSend }: { payload: ResponseType['certSend'] }) => ({ ...state, certSend, certSendError: null }),
        [CERT_SEND_FAILURE]: (state: ResponseType = initialState, { payload: error }: { payload: any }) => ({ ...state, certSendError: error }),
        [CERT_CHECK_SUCCESS]: (state: ResponseType = initialState, { payload: certCheck }: { payload: ResponseType['certCheck'] }) => ({ ...state, certCheck, certCheckError: null }),
        [CERT_CHECK_FAILURE]: (state: ResponseType = initialState, { payload: error }: { payload: ResponseType['certCheckError'] }) => ({ ...state, certCheckError: error }),
    },
    initialState,
);

export default user;
