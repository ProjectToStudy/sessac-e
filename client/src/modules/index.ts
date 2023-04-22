import { combineReducers } from 'redux';
import { all } from 'redux-saga/effects';
import user, { userSaga } from './user';
import study, { studySaga } from './study';

const rootReducer = combineReducers({
    user,
    study,
});

export function * rootSaga () {
    yield all([userSaga(), studySaga()]);
}

export default rootReducer;

export type RootState = ReturnType<typeof rootReducer>;
