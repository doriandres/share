import {
    put,
    call,
    takeLatest
} from 'redux-saga/effects';

import saga from '../helpers/saga';
import { savePost } from './../../helper/api';
import { REQUEST_POST_SAVE } from './types';
import { postSaveInProgress, handlePostSaveResponse } from './actions';

export default [
    saga(takeLatest, REQUEST_POST_SAVE, function*(postData){
        try {
            yield put(postSaveInProgress());
            const post = yield call(savePost, postData);
            yield put(handlePostSaveResponse(post));
        } catch (e) {
            yield put(handlePostSaveResponse(e));
        }
    })
]
