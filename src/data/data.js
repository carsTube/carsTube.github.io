import { getUserData } from '../util.js';
import * as api from './api.js'

export const login = api.login;
export const register = api.register;
export const logout = api.logout;


const endPoints = {
    ads: '/classes/Ad?order=-createdAt',
    adById: '/classes/Ad/',
}

function createPointer(className, objectId) {
    return {
        __type: 'Pointer',
        className,
        objectId
    };
}

function addOwner(record) {
    const { id } = getUserData();
    record.owner = createPointer('_User', id);
}


export async function getAds() {
    return api.get(endPoints.ads)
};


export async function getAdById(id) {
    return api.get(endPoints.adById + id)
}



export async function createAd(ad) {
    addOwner(ad);
    return api.post(endPoints.ads, ad);
}


export async function updateAd(id, ad) {
    api.put(endPoints.adById + id, ad);
}


export async function deleteAd(id) {
    api.del(endPoints.adById + id);
}