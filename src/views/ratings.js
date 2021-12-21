import { getRateFromUser, getRating, rateAd, updateRateFromUser } from "../data/rating.js";
import { page } from "../lib.js";
import { currentAdId, getUserData } from "../util.js";


export async function onRate(rating) {
    const adId = currentAdId();
    const result = await checkIfRated(adId);
    if (result.results.length == 0) {
        await rateAd(adId, rating);
        page.redirect(`/details/${adId}`)
    } else {
        const id = result.results[0].objectId;
        await updateRateFromUser(id, {rating});
        page.redirect(`/details/${adId}`)
    }

}


export async function getAdRating(adId) {
    const result = await getRating(adId);
    let rate = 0;
    result.results.forEach((el) => rate += el.rating);
    rate = rate / result.results.length;
    return rate;
}


async function checkIfRated(adId) {
    const { id } = getUserData();
    const query = `where={ \"ad\":{ \"__type\": \"Pointer\", \"className\": \"Ad\", \"objectId\": \"${adId}\" },\"owner\":{ \"__type\": \"Pointer\", \"className\": \"_User\", \"objectId\": \"${id}\" } }`
    const result = await getRateFromUser(query);
    return result;
}
