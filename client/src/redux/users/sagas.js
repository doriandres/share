import {
    put,
    call,
    takeLatest
} from 'redux-saga/effects';

import saga from '../helpers/saga';   
import { validateUser, saveUser } from './../../helper/api';
import { signUpInProgress, handleSignUpResponse, signInInProgress, handleSignInResponse } from './actions';
import { REQUEST_SIGN_UP, REQUEST_SIGN_IN } from './types';

export default [
    saga(takeLatest, REQUEST_SIGN_UP, function*(userData){
        try {
            yield put(signUpInProgress());
            const user = yield call(saveUser, userData);
            yield put(handleSignUpResponse(user));
        } catch (e) {
            yield put(handleSignUpResponse(e));
        }
    }),

    saga(takeLatest, REQUEST_SIGN_IN, function*(userData){
        try {
            yield put(signInInProgress());
            const user = yield call(validateUser, userData);
            yield put(handleSignInResponse(user));
        } catch (e) {
            yield put(handleSignInResponse(e));
        }
    })
]
