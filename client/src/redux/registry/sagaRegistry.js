import {    
    all, call,    
} from 'redux-saga/effects';

import userSagas from './../users/sagas';
import postsSagas from './../posts/sagas';

const sagas = [
    ...userSagas,
    ...postsSagas
];

export default function*() {
    yield all(sagas.map( s => call(s)));
}