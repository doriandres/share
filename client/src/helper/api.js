export const saveUser = async function(userData){
    let response = await fetch('/api/user/save', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(userData),
    });
    let responseData = await response.json();
    return responseData;
}

export const savePost = async function(postData){
    let response = await fetch('/api/post/save', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(postData),
    });
    let responseData = await response.json();
    return responseData;
}

export const validateUser = async function(userData){
    let response = await fetch('/api/user/validate', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(userData),
    });
    let responseData = await response.json();
    return responseData;
}