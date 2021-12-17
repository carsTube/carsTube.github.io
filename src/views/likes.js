import { likeAd, getLikes, getLikeFromUser, unLikeAd } from '../data/like.js';
import { page } from '../lib.js'
import { getUserData } from '../util.js';

export async function onLike() {
    const adId = window.location.href.split('/')[4]
    await likeAd(adId);
    page.redirect(`/details/${adId}`)
}


export async function onUnLike() {
    const adId = window.location.href.split('/')[4]
    const { id } = getUserData();

    const query = `where={ \"ad\":{ \"__type\": \"Pointer\", \"className\": \"Ad\", \"objectId\": \"${adId}\" },\"owner\":{ \"__type\": \"Pointer\", \"className\": \"_User\", \"objectId\": \"${id}\" } }`
    const result = await getLikeFromUser(query);
    const likeId = result.results[0].objectId;
    
    await unLikeAd(likeId);
    page.redirect(`/details/${adId}`);
}


export async function getLikesCount(adId) {
    const result = await getLikes(adId);
    return result.results.length;
}


export async function hasLikedAd(ownerId, adId) {
    const query = `where={ \"ad\":{ \"__type\": \"Pointer\", \"className\": \"Ad\", \"objectId\": \"${adId}\" },\"owner\":{ \"__type\": \"Pointer\", \"className\": \"_User\", \"objectId\": \"${ownerId}\" } }`
    const result = await getLikeFromUser(query);
    return result.results;
}

