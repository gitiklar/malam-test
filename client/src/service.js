
const serverUrl = 'http://localhost:3000/api';

const getToken = () => localStorage.getItem('accessToken');

const doFetch = async (url , method , sendToken , body = null) => {
    const options = {
        method: method,
        headers: {
            'Content-Type':'application/json',
        },
        mode: 'cors',
    };
    body && (options.body = JSON.stringify(body));
    sendToken && (options.headers['x-access-token'] = getToken());
    const response = await fetch(url , options);
    if(response.headers.get('Content-Type').startsWith('application/json')) {
        return await response.json();
    }
    return response;
}

export const postRequest = async (url , sendToken , data) => {
    return await doFetch(`${serverUrl}${url}` , 'POST' , sendToken , data);
}

export const getRequest = async (url , sendToken , data) => {
    return await doFetch(`${serverUrl}${url}` , 'GET' , sendToken , data);
}

export const deleteRequest = async (url , sendToken) => {
    return await doFetch(`${serverUrl}${url}` , 'DELETE' , sendToken);
}

export const putRequest = async (url , sendToken , data) => {
    return await doFetch(`${serverUrl}${url}` , 'PUT' , sendToken , data);
}