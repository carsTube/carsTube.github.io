import { getUserData } from '../util.js';
import * as api from './api.js'

export const login = api.login;
export const register = api.register;
export const logout = api.logout;

const pageSize = 4;

const endPoints = {
    createAd: '/classes/Ad',
    ads: (page, pageSize) => `/classes/Ad?skip=${(page - 1) * pageSize}&limit=${pageSize}&count=1&order=-createdAt`,
    adsSearch: (page, query, pageSize) => `/classes/Ad?where=${createQuery(query)}&skip=${(page - 1) * pageSize}&limit=${pageSize}&count=1`,
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

export function createQuery(query) {
    return encodeURIComponent(JSON.stringify(query));
}


export async function getAds(page, query) {
    const data = await (() => {
        if (query) {
            query = {
                name: {
                    $text: {
                        $search: {
                            $term: query,
                            $caseSensitive: false
                        }
                    }
                }
            };
            return api.get(endPoints.adsSearch(page, query, pageSize))
        } else {
            return api.get(endPoints.ads(page, pageSize))
        }
    })();
    data.pages = Math.ceil(data.count / pageSize);

    return data;

}


export async function getAdById(id) {
    return api.get(endPoints.adById + id)
}



export async function createAd(ad) {
    addOwner(ad);
    return api.post(endPoints.createAd, ad);
}


export async function updateAd(id, ad) {
    api.put(endPoints.adById + id, ad);
}


export async function deleteAd(id) {
    api.del(endPoints.adById + id);
}