import { REQUEST_POST_SAVE, POST_SAVE_IN_PROGRESS, HANDLE_POST_SAVE_RESPONSE, RESTORE_POST_SAVE } from "./types";

export const requestPostSave = (postData) => ({
    type: REQUEST_POST_SAVE,
    payload : postData
});

export const postSaveInProgress = () => ({
    type: POST_SAVE_IN_PROGRESS    
});

export const handlePostSaveResponse = (response) => ({
    type: HANDLE_POST_SAVE_RESPONSE,
    payload : response
});

export const restorePostSave = () => ({
    type: RESTORE_POST_SAVE    
});