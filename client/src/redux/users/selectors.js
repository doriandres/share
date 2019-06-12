export const isSignUpInProgress = (state) =>{
    return state.appStatus.signUp.inProgress;
}
export const signUpRequestResult = (state) =>{
    return state.appStatus.signUp.requestResult;
}

export const isSignInInProgress = (state) =>{
    return state.appStatus.signIn.inProgress;
}
export const signInRequestResult = (state) =>{
    return state.appStatus.signIn.requestResult;
}
export const getSignedUser = (state) =>{
    return state.entities.users[state.appStatus.signedUser];
}
export const getUserById = (state, id) => {
    return state.entities.users[id];
}
