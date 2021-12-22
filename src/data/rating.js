import * as api from './api.js'
import { endPoints, createPointer, addOwner} from './data.js'

export async function rateAd(adId, rating) {
    const rate = {
        rating
    }
    rate.ad = createPointer('Ad', adId);
    addOwner(rate);
    return api.post(endPoints.rateAd, rate);
}


export async function getRating(adId) {
    return api.get(endPoints.ratingForAd(adId));
}


export async function getRateFromUser(query) {
    return api.get(endPoints.hasRatedAd(query));
}


export async function updateRateFromUser(id, data) {
    return api.put(endPoints.rateById + id, data)
}