import { call, all, takeEvery, takeLatest, put, fork } from 'redux-saga/effects';
import { push } from 'react-router-redux';
import { clearToken } from '../../helpers/utility';
import actions from './actions';
import axios from 'axios';

const fakeApiCall = true; // auth0 or express JWT

const signupUrl = `http://localhost:8080/login`;

function loginApi(username, password) {
   
    console.log(`${username}, ${password}`);
    return fetch(signupUrl, {
        method: 'POST',
        mode: 'no-cors',
        headers: new Headers({'content-type': 'application/json'}),
        body: JSON.stringify({ "username" : username, "password": password }),
    })
        .then(handleApiErrors) // we'll make this in a second
        .then(response => {
            console.log("Response", response);
            return response.json();
        })
        .then(json => json)
        .catch((error) => { throw error })
}

function* loginFlow(action) {
    console.log(action);
    try {
        const { username, password } = action.payload;
        const data = yield call(loginApi, username, password)
        yield put({
            type: actions.LOGIN_SUCCESS,
            token: data.auth_token,
            profile: 'Profile'
        })
    } catch (error) {
        yield put({ type: actions.LOGIN_ERROR });
    }
    // axios.post('http://localhost:8080/login', {
    //     username: action.username,
    //     password: action.password
    // })
    //     .then((response) => {
    //         return response.data
    //     }, (error) => {
    //         throw new Error(error);
    //     });
}

function handleApiErrors(response) {
    if (!response.ok) throw Error(response.statusText)
    return response
}


// export function* loginHandler(username, password) {
//     try {
//         const data = yield call(loginApiCall(username, password));
//         yield put({
//             type: actions.LOGIN_SUCCESS,
//             token: data.auth_token,
//             profile: 'Profile'
//         });
//     } catch (error) {
//         yield put({ type: actions.LOGIN_ERROR });
//     }
//     if (loginApiCall(username, password)) {
//         yield put({
//             type: actions.LOGIN_SUCCESS,
//             token: 'secret token',
//             profile: 'Profile'
//         });
//     } else {
//         yield put({ type: actions.LOGIN_ERROR });
//     }
// }


export function* loginRequest() {
    yield takeLatest(actions.LOGIN_REQUEST, loginFlow);
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
