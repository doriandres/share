export default {    
    appStatus : {
        signedUser : null,
        postSave : {
            inProgress : false,
            requestResult : ''
        },
        signIn : {
            inProgress : false,
            requestResult : ''
        },
        signUp : {
            inProgress : false,
            requestResult : ''
        }
    },
    entities : {
        users : {},
        posts : {},
        comments : {},
        likes : {}
    }
};