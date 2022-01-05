import { getUserData } from '../util.js';
import * as api from './api.js'


const pageSize = 6;

export const endPoints = {
    createAd: '/classes/Ad',
    user: '/users/',
    ads: (page, pageSize, order) => `/classes/Ad?skip=${(page - 1) * pageSize}&limit=${pageSize}&count=1&order=${order}`,
    recentAds: '/classes/Ad?limit=2&order=-createdAt',
    ownAds: (objectId) => `/classes/Ad?where=${createPointerQuery('owner', '_User', objectId)}&order=-createdAt`,
    adsSearch: (page, query, pageSize, order) => `/classes/Ad?where=${createQuery(query)}&skip=${(page - 1) * pageSize}&limit=${pageSize}&count=1&order=${order}`,
    adById: '/classes/Ad/',
    likeAd: '/classes/Like',
    likeById: '/classes/Like/',
    likesForAd: (adId) => `/classes/Like?where=${createPointerQuery('ad', 'Ad', adId)}`,
    hasLikedAd: (query) => `/classes/Like?${query}`,
    rateAd: '/classes/Rating',
    rateById: '/classes/Rating/',
    ratingForAd: (adId) => `/classes/Rating?where=${createPointerQuery('ad', 'Ad', adId)}`,
    hasRatedAd: (query) => `/classes/Rating?${query}`,
   
}

export function createPointerQuery(propName, className, objectId) {
    return createQuery({[propName]: createPointer(className, objectId) });
}

export function createPointer(className, objectId) {
    return {
        __type: 'Pointer',
        className,
        objectId
    };
}

export function createQuery(query) {
    return encodeURIComponent(JSON.stringify(query));
}


export function addOwner(record) {
    const { id } = getUserData();
    record.owner = createPointer('_User', id);
}



export async function getAds(page, query, own, order) {
    if (own == true){
        const {id} = getUserData();
        return api.get(endPoints.ownAds(id));
    }
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
            return api.get(endPoints.adsSearch(page, query, pageSize, order))
        } else {
            return api.get(endPoints.ads(page, pageSize, order))
        }
    })();
    data.pages = Math.ceil(data.count / pageSize);

    return data;
}

export async function getRecentAds() {
    return api.get(endPoints.recentAds);
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