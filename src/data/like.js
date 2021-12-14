import * as api from './api.js'
import { endPoints, createPointer, addOwner} from './data.js'

export async function likeAd(adId, like) {
    like.ad = createPointer('Ad', adId);
    addOwner(like);
    return api.post(endPoints.likeAd, like);
}


export async function getLikes(adId) {
    return api.get(endPoints.likesForAd(adId));
}

export async function getLikeFromUser(ownerId, adId) {
    return api.get(endPoints.hasLikedAd(ownerId, adId));
}

