import { getAdById } from '../data/data.js'
import { html } from '../lib.js'
import { getUserData } from '../util.js';


const detailsTemplate = (ad, isOwner) => html`
<section id="details">
    <article>
        <h2>${ad.name}</h2>
        <div class="band">
            <div class="thumb"><img src=${ad.img}></div>
            <div class="ingredients">
                <ul>
                    <li>Year: ${ad.year}</li>
                    <li>Price: ${ad.price} €</li>
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
            <a class="actionLink" href="javascript:void(0)">&#x2716; Delete</a>
        </div>` : null}
        
    </article>      
</section>
`

export async function detailsPage(ctx) {
    const ad = await getAdById(ctx.params.id);
    const userData = getUserData();
    const isOwner = userData && userData.id == ad.owner.objectId 

    ctx.render(detailsTemplate(ad, isOwner));
}