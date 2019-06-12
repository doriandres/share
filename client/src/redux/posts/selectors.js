export const isPostSaveInProgress = (state) =>{
    return state.appStatus.postSave.inProgress;
}
export const postSaveRequestResult = (state) =>{
    return state.appStatus.postSave.requestResult;
}
export const getSignedUserPosts = (state) =>{
    let posts = [];
    for(let p in state.entities.posts){
        if(state.entities.posts[p].user === state.appStatus.signedUser){
            posts.push(state.entities.posts[p]);
        }
    }
    posts.reverse();
    return posts;
}
