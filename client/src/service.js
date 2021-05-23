
const serverUrl = 'http://localhost:3000/api';
import axios from 'axios';

const getToken = () => localStorage.getItem('accessToken');

const doFetch = async (url , method , sendToken , body = null , contentType=null) => {
    const options = {
        method: method,
        mode: 'cors',
        headers: { 'Content-Type' : 'application/json'},
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

const api = axios.create({ baseURL: serverUrl})
api.interceptors.request.use(function (config) {
    config.headers['x-access-token'] = getToken();
    return config;
});

export const addCandyToDB = (candy) => api.post('/candy', candy, {'Content-Type': 'multipart/form-data'}).then(response => response.data);