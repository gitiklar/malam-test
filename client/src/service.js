const serverUrl = 'http://localhost:3000/api';

const doFetch = async (url , method , body = null) => {
    const options = {
        method: method,
        headers: {
            'Content-Type':'application/json',
        },
        mode: 'cors',
    };
    body && (options.body = JSON.stringify(body));
    const response = await fetch(url , options);
    if(response.headers.get('Content-Type').startsWith('application/json')) {
        return await response.json();
    }
    return response;
}

export const postRequest = async (url , data) => {
    return await doFetch(`${serverUrl}${url}` , 'POST' , data);
}

export const getRequest = async (url , data) => {
    return await doFetch(`${serverUrl}${url}` , 'GET' , data);
}

export const deleteRequest = async (url) => {
    return await doFetch(`${serverUrl}${url}` , 'DELETE');
}

export const putRequest = async (url , data) => {
    return await doFetch(`${serverUrl}${url}` , 'PUT' , data);
}