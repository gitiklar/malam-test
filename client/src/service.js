
const serverUrl = 'http://localhost:3000/api';
import axios from 'axios';

const getToken = () => localStorage.getItem('accessToken');

const doFetch = async (url , method , sendToken , body = null , contentType=null) => {
    const options = {
        method: method,
        mode: 'cors',
        headers: {},
    };
    !contentType && (options.headers['Content-Type'] = 'application/json');
    contentType && (options.headers['Content-Type'] = contentType);
    body && !contentType && (options.body = JSON.stringify(body));
    body && contentType && (options.body = body);
    sendToken && (options.headers['x-access-token'] = getToken());
    const response = await fetch(url , options);
    if(response.headers.get('Content-Type').startsWith('application/json')) {
        return await response.json();
    }
    return response;
}

export const postRequest = async (url , sendToken , data , contentType) => {
    return await doFetch(`${serverUrl}${url}` , 'POST' , sendToken , data , contentType);
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

/*

import axios from 'axios';

const api = axios.create({
    baseURL: 'http://localhost:3001/api',
})

api.interceptors.request.use(function (config) {
    const token = localStorage.getItem('token');
    config.headers.Authorization =  token ? `Bearer ${token}` : '';
    return config;
});

export const addCandy = (candy) => api.post('/candy', candy, {'Content-Type': 'multipart/form-data'}).then(response => response.data);
export const bulkUpdateAmount = (candies) => api.post('/candy/bulk', candies).then(response => response.data);
export const updateCandy = (candy) => api.put(`/candy/${candy.key}`, candy).then(response => response.data);
export const getAllCandies = () => api.get('/candies',{'Authorization' : null}).then(response => response.data);
*/