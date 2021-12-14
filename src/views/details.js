import { deleteAd, getAdById } from '../data/data.js'
import { html } from '../lib.js'
import { getUserData } from '../util.js';
import { getLikesCount, hasLikedAd } from './likes.js';
import { onLike } from './likes.js';




const detailsTemplate = (ad, isOwner, onDelete, likesCount, onLike, canLikeAd) => html`
<section id="details">
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
        ${isOwner ? html `
        <div class="controls">
            <a class="actionLink" href="/edit/${ad.objectId}">&#x270e; Edit</a>
            <a class="actionLink" href="javascript:void(0)" @click=${onDelete}>&#x2716; Delete</a>
        </div>` : null}
        <div class="controls">
            Likes: ${likesCount} times
            ${canLikeAd ? html `<a class="actionLink" href="javascript:void(0)" @click=${onLike}>&#x1F44D Like</a>` : null}
        </div>
    </article>      
</section>
`

export async function detailsPage(ctx) {
    const userData = getUserData();

    const [ad, likesCount, hasLiked] = await Promise.all([
        await getAdById(ctx.params.id),
        await getLikesCount(ctx.params.id),
        userData ? await hasLikedAd(userData.id, ctx.params.id) : null,
        
    ])

    const isOwner = userData && userData.id == ad.owner.objectId 
    const canLikeAd = isOwner == false && hasLiked == 0;
    
    ctx.render(detailsTemplate(ad, isOwner, onDelete, likesCount, onLike, canLikeAd));

    async function onDelete() {
        const choice = confirm(`Are you sure you want to delete ${ad.name}`)
        if (choice) {
            await deleteAd(ctx.params.id);
            ctx.page.redirect('/catalog');
        }
    }
}