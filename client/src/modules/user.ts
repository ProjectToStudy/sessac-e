import { createAction, handleActions } from 'redux-actions';
import { takeLatest } from 'redux-saga/effects';
import createRequestSaga, { createRequestActionTypes } from '../lib/createRequestSaga';
import * as userAPI from '../api/user';

const [CERT_SEND, CERT_SEND_SUCCESS, CERT_SEND_FAILURE] = createRequestActionTypes('user/CERT_SEND');
const [CERT_CHECK, CERT_CHECK_SUCCESS, CERT_CHECK_FAILURE] = createRequestActionTypes('user/CERT_CHECK');

export const certSendAPI = createAction(CERT_SEND, (phone: string) => (phone));
export const certCheckAPI = createAction(CERT_CHECK, ({ phone, certificationNumber }: { phone: string, certificationNumber: string }) => ({ phone, certificationNumber }));

const certSendSaga = createRequestSaga(CERT_SEND, userAPI.certSend);
const certCheckSaga = createRequestSaga(CERT_CHECK, userAPI.certCheck);
export function * userSaga () {
    yield takeLatest(CERT_SEND, certSendSaga);
    yield takeLatest(CERT_CHECK, certCheckSaga);
}

export interface ResponseType {
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
    certSend: null,
    certSendError: null,
    certCheck: null,
    certCheckError: null,
};

const user = handleActions(
    {
        [CERT_SEND_SUCCESS]: (state: ResponseType = initialState, { payload: certSend }: { payload: ResponseType['certSend'] }) => ({ ...state, certSend, certSendError: null }),
        [CERT_SEND_FAILURE]: (state: ResponseType = initialState, { payload: error }: { payload: any }) => ({ ...state, certSendError: error }),
        [CERT_CHECK_SUCCESS]: (state: ResponseType = initialState, { payload: certCheck }: { payload: ResponseType['certCheck'] }) => ({ ...state, certCheck, certCheckError: null }),
        [CERT_CHECK_FAILURE]: (state: ResponseType = initialState, { payload: error }: { payload: ResponseType['certCheckError'] }) => ({ ...state, certCheckError: error }),
    },
    initialState,
);

export default user;
