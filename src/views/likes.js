import { likeAd, getLikes, getLikeFromUser } from '../data/like.js';
import { createPointerQuery } from '../data/data.js';
import { page } from '../lib.js'


export async function onLike() {
    const adId = window.location.href.split('/')[4]
    let like = {}
    await likeAd(adId, like);
    page.redirect(`/details/${adId}`)
}


export async function getLikesCount(adId) {
    const result = await getLikes(adId);
    return result.results.length;
}

export async function hasLikedAd(ownerId, adId) {
    const query = `where={ \"ad\":{ \"__type\": \"Pointer\", \"className\": \"Ad\", \"objectId\": \"${adId}\" },\"owner\":{ \"__type\": \"Pointer\", \"className\": \"_User\", \"objectId\": \"${ownerId}\" } }`
    const result = await getLikeFromUser(query);
    return result.results.length;
}

