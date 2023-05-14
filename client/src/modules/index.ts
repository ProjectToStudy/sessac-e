import { combineReducers } from 'redux';
import { all } from 'redux-saga/effects';
import user, { userSaga } from './user';
import study, { studySaga } from './study';
import userInfo, { userInfoSaga } from './userInfo';

const rootReducer = combineReducers({
    user,
    userInfo,
    study,
});

export function* rootSaga() {
    yield all([userSaga(), userInfoSaga(), studySaga()]);
}

export default rootReducer;

export type RootState = ReturnType<typeof rootReducer>;
