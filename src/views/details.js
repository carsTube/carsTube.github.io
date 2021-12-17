import { deleteAd, getAdById } from '../data/data.js'
import { html, until } from '../lib.js'
import { getUserData } from '../util.js';
import { getLikesCount, hasLikedAd } from './likes.js';
import { onLike, onUnLike } from './likes.js';
import { spinner, createDeleteConfirm } from '../middlewares.js';


const detailsTemplate = (adPromise) => html`
<section id="details">
    ${until(adPromise, spinner())}
</section>
`

const adCard = (ad, isOwner, onDelete, likesCount, onLike, hasLiked, OnUnLike, isLogged) => html`
<article>
        <h2>${ad.name}</h2>
        <div class="band">
            <div class="thumb"><img src=${ad.img}></div>
            <div class="information">
                    <h3>Information</h3>
                    <ul>
                        <li>Year: ${ad.year}</li>
                        <li>Price: ${ad.price} &#x20AC</li>
                    </ul>
            </div>
        </div>  
        ${ad.description ? html `
        <div class="description">
        More information: ${ad.description}
        </div>` : 
        isOwner ? html`<p>Click edit to add more information.</p>` :
        html `<p>The owner did not provide description for this ad.</p>`}
        <div class="controls">Liked: ${likesCount} times
        ${buttonsTemplate(ad, isOwner, onDelete, hasLiked, isLogged, onLike, OnUnLike)}
        </div>
    </article>      
`

const buttonsTemplate = (ad, isOwner, onDelete, hasLiked, isLogged, onLike, OnUnLike) => {
    if (isOwner == true) {
        return html`
        <a class="actionLink" href="javascript:void(0)" @click=${onDelete}>Delete &#x2716;</a>
        <a class="actionLink" href="/edit/${ad.objectId}">Edit &#x270e;</a>`
    } else {
        if (isLogged && hasLiked.length == 0) {
            return html`
            <a class="actionLink" href="javascript:void(0)" @click=${onLike}>Like &#x2605;</a>`
        } else if (isLogged && hasLiked.length == 1) {
            return html`
            <a class="actionLink" href="javascript:void(0)" @click=${OnUnLike}>Unlike &#x2606;</a>
            `
        }
    }
}


export async function detailsPage(ctx) {
   ctx.render(detailsTemplate(loadAd(ctx)));
}


async function loadAd(ctx) {
    const userData = getUserData();
    const [ad, likesCount, hasLiked] = await Promise.all([
        await getAdById(ctx.params.id),
        await getLikesCount(ctx.params.id),
        userData ? await hasLikedAd(userData.id, ctx.params.id) : null,
    ])

    const isOwner = userData && userData.id == ad.owner.objectId
    const isLogged = userData != null;

    return adCard(ad, isOwner, onDelete, likesCount, onLike, hasLiked, onUnLike, isLogged)
    

    async function onDelete() {
        createDeleteConfirm(`Are you sure you want to delete ${ad.name} ?`, onOk, onCancel);

        async function onOk() {
            await deleteAd(ctx.params.id);
            ctx.page.redirect('/catalog');
        }

        function onCancel (event) {
            event.target.parentElement.parentElement.remove();
            return;
        }

    }  
}
