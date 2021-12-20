import * as api from './api.js'
import { endPoints } from './data.js';

export const login = api.login;
export const register = api.register;
export const logout = api.logout;


export async function getOnwerInfo(id) {
    return api.get(endPoints.user + id);
}