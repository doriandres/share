import reducer from './../helpers/reducer';

import {userSchema} from './../schemas';
import mergeEntities from "../helpers/mergeEntities";
import { normalize } from 'normalizr';
import { SIGN_UP_IN_PROGRESS, HANDLE_SIGN_UP_RESPONSE, RESTORE_SIGN_UP, SIGN_IN_IN_PROGRESS, HANDLE_SIGN_IN_RESPONSE, RESTORE_SIGN_IN, SIGN_OUT } from './types';

export default [
    // SIGN UP
    reducer(SIGN_UP_IN_PROGRESS, (base, draft) =>{
        draft.appStatus.signUp.inProgress = true;
    }),
    reducer(HANDLE_SIGN_UP_RESPONSE, (base, draft, response) =>{
        if(response && response._id){
            const result = normalize(response, userSchema);
            draft.entities = mergeEntities({...base.entities}, result.entities);
            draft.appStatus.signedUser = response._id;
            draft.appStatus.signUp.requestResult = 'succeded';
        }else{
            draft.appStatus.signUp.requestResult = 'failed';
        }
    }),
    reducer(RESTORE_SIGN_UP, (base, draft) =>{
        draft.appStatus.signUp.inProgress = false;
        draft.appStatus.signUp.requestResult = '';
    }),

    // SIGN IN
    reducer(SIGN_IN_IN_PROGRESS, (base, draft) =>{
        draft.appStatus.signIn.inProgress = true;
    }),
    reducer(HANDLE_SIGN_IN_RESPONSE, (base, draft, response) =>{
        if(response && response._id){
            const result = normalize(response, userSchema);
            draft.entities = mergeEntities({...base.entities}, result.entities);
            draft.appStatus.signedUser = response._id;
            draft.appStatus.signIn.requestResult = 'succeded';
        }else{
            draft.appStatus.signIn.requestResult = 'failed';
        }
    }),
    reducer(RESTORE_SIGN_IN, (base, draft) =>{
        draft.appStatus.signIn.inProgress = false;
        draft.appStatus.signIn.requestResult = '';
    }),
    reducer(SIGN_OUT, (base, draft) =>{
        draft.appStatus.signedUser = '';
    })
];