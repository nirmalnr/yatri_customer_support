import { call, all, takeEvery, put, fork } from 'redux-saga/effects';
import { push } from 'react-router-redux';
import { clearToken } from '../../helpers/utility';
import actions from './actions';
import { get } from 'axios';

const fakeApiCall = true; // auth0 or express JWT

export function fakeAuthorize(user, password) {
    return new Promise(async (resolve, reject) => {
        try {
            const result = await get('http://localhost:3001/login');
            resolve(result.data.token);
        } catch (error) {
            reject(error);
        }
    });
}

export function* watchOrderSearchRequest() {
    yield take('FETCH_ORDERS');
    yield call(fetchOrdersWorker)
}

export function* watchViewOrder() {

}

// If you notice carefully, the worker saga is inside the watcher saga
export function* loginRequest() {
    yield take('LOGIN_REQUEST');
    yield call(loginWorker);
    yield take(actions.LOGOUT);

    // yield takeEvery('LOGIN_REQUEST', function* (payload) {
    //     if (call(fakeAuthorize(payload.username, payload.password))) {
    //         yield put({
    //             type: actions.LOGIN_SUCCESS,
    //             token: 'secret token',
    //             profile: 'Profile'
    //         });
    //     } else {
    //         yield put({ type: actions.LOGIN_ERROR });
    //     }
    // });
}

export function* loginSuccess() {
    yield takeEvery(actions.LOGIN_SUCCESS, function* (payload) {
        yield localStorage.setItem('id_token', payload.token);
    });
}

export function* loginError() {
    yield takeEvery(actions.LOGIN_ERROR, function* () { });
}

export function* logout() {
    yield takeEvery(actions.LOGOUT, function* () {
        clearToken();
        yield put(push('/'));
    });
}

export default function* rootSaga() {
    yield all([
        fork(loginRequest),
        fork(loginSuccess),
        fork(loginError),
        fork(logout)
    ]);
}
