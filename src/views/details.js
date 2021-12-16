import { deleteAd, getAdById } from '../data/data.js'
import { html, until } from '../lib.js'
import { getUserData } from '../util.js';
import { getLikesCount, hasLikedAd } from './likes.js';
import { onLike, onUnLike } from './likes.js';
import { spinner } from '../middlewares.js';




const detailsTemplate = (adPromise) => html`
<section id="details">
    ${until(adPromise, spinner())}
</section>
`

const buttonsTemplate = (ad, isOwner, onDelete, hasLiked, isLogged, onLike, OnUnLike) => {
    if (isOwner == true) {
        return html`
        <a class="actionLink" href="javascript:void(0)" @click=${onDelete}>&#x2716; Delete</a>
        <a class="actionLink" href="/edit/${ad.objectId}">&#x270e; Edit</a>`
    } else {
        if (isLogged && hasLiked.length == 0) {
            return html`
            <a class="actionLink" href="javascript:void(0)" @click=${onLike}>&#x1F44D Like</a>`
        } else if (isLogged && hasLiked.length == 1) {
            return html`
            <a class="actionLink" href="javascript:void(0)" @click=${OnUnLike}>&#128078 Unlike</a>
            `
        }
    }
}

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
        html `<p>The owner did not provide description for this ad.</p>`}
        <div class="controls">Likes: ${likesCount} times
        ${buttonsTemplate(ad, isOwner, onDelete, hasLiked, isLogged, onLike, OnUnLike)}
        </div>
    </article>      
`


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
        const choice = confirm(`Are you sure you want to delete ${ad.name}`)
        if (choice) {
            await deleteAd(ctx.params.id);
            ctx.page.redirect('/catalog');
        }
    }
}