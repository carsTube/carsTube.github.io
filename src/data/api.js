import { createErrorModal } from "../middlewares.js";
import { clearUserData, getUserData, setUserData } from "../util.js";

const host = 'https://parseapi.back4app.com'

async function request(url, options) {
    try {
        const response = await fetch(host + url, options);
        if (response.ok == false) {
            const error = await response.json();
            throw {
                message: error.error,
                code: error.code
            }
        }

        return response.json();

    } catch (err) {
        createErrorModal(err.message);
        throw err;
    }

}


function createOptions(method='get', data) {
    const options = {
        method,
        headers: {
            'X-Parse-Application-Id': 'aCveKvSHagOSbRMbCAyAf2MS1kDMsUCk9swoXnve',
            'X-Parse-REST-API-Key': '1A202mRHaCM6IMyMgSagPkLfWFu4NSPUle6Pr3wN'
        }
    };

    const userData = getUserData();

    if (userData) {
        options.headers['X-Parse-Session-Token'] = userData.token;
    }

    if (data) {
        options.headers['Content-Type'] = 'application/json';
        options.body = JSON.stringify(data);
    }
    return options;
}

export async function get(url) {
    return request(url, createOptions());
}


export async function post(url, data) {
    return request(url, createOptions('post', data));
}


export async function put(url, data) {
    return request(url, createOptions('put', data));
}


export async function del(url) {
    return request(url, createOptions('delete'));
}


export async function login(username, password) {
    const result = await post('/login', {username, password});
    const userData = {
        username: result.username,
        id: result.objectId,
        token: result.sessionToken,
        email: result.email
    };

    setUserData(userData);

    return result;
}


export async function register(username, email, password) {
    const result = await post('/users', {username, email, password});
    const userData = {
        username,
        id: result.objectId,
        token: result.sessionToken
    };

    setUserData(userData);
    return result;
}


export function logout() {
    post('/logout');
    clearUserData(); 
}

