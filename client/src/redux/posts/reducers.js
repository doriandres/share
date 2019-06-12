import reducer from './../helpers/reducer';

import mergeEntities from "../helpers/mergeEntities";
import { normalize } from 'normalizr';
import { POST_SAVE_IN_PROGRESS, HANDLE_POST_SAVE_RESPONSE, RESTORE_POST_SAVE } from './types';
import { postSchema } from '../schemas';


export default [
    reducer(POST_SAVE_IN_PROGRESS, (base, draft) =>{
        draft.appStatus.postSave.inProgress = true;
    }),
    reducer(HANDLE_POST_SAVE_RESPONSE, (base, draft, response) =>{
        if(response && response._id){
            const result = normalize(response, postSchema);
            draft.entities = mergeEntities({...base.entities}, result.entities);            
            draft.appStatus.postSave.requestResult = 'succeded';
        }else{
            draft.appStatus.postSave.requestResult = 'failed';
        }
    }),
    reducer(RESTORE_POST_SAVE, (base, draft) =>{
        draft.appStatus.postSave.inProgress = false;
        draft.appStatus.postSave.requestResult = '';
    })
];