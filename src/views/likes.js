import { likeAd, getLikes, getLikeFromUser, unLikeAd } from '../data/like.js';
import { page } from '../lib.js'
import { getUserData } from '../util.js';
import { craeateQueryWithDoublePointers, currentAdId } from '../util.js';

export async function onLike() {
        const adId = currentAdId();
        await likeAd(adId);
        page.redirect(`/details/${adId}`)
}


export async function onUnLike() {
    const adId = currentAdId();
    const { id } = getUserData();

    const query = craeateQueryWithDoublePointers(id, adId);
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
    const query = craeateQueryWithDoublePointers(ownerId, adId);
    const result = await getLikeFromUser(query);
    return result.results;
}


