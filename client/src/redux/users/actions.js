import { REQUEST_SIGN_UP, HANDLE_SIGN_UP_RESPONSE, RESTORE_SIGN_UP, SIGN_UP_IN_PROGRESS, REQUEST_SIGN_IN, SIGN_IN_IN_PROGRESS, HANDLE_SIGN_IN_RESPONSE, RESTORE_SIGN_IN, SIGN_OUT } from "./types";

// SIGN UP
export const requestSignUp = (userData)=> ({
    type: REQUEST_SIGN_UP,
    payload : userData
});
export const signUpInProgress = ()=> ({
    type: SIGN_UP_IN_PROGRESS
});
export const handleSignUpResponse = (response)=> ({
    type: HANDLE_SIGN_UP_RESPONSE,
    payload : response
});
export const restoreSignUp = ()=> ({
    type: RESTORE_SIGN_UP
});

// SIGN IN
export const requestSignIn = (userData)=> ({
    type: REQUEST_SIGN_IN,
    payload : userData
});
export const signInInProgress = ()=> ({
    type: SIGN_IN_IN_PROGRESS
});
export const handleSignInResponse = (response)=> ({
    type: HANDLE_SIGN_IN_RESPONSE,
    payload : response
});
export const restoreSignIn = ()=> ({
    type: RESTORE_SIGN_IN
});

export const signOut = ()=> ({
    type: SIGN_OUT
});
