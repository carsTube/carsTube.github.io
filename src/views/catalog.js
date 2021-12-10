import { getAds } from '../data/data.js';
import { html } from '../lib.js'

const catalogTemplate = (ads) => html`
<section id="catalog">
    ${ads.map(adCard)}
</section>`


const adCard = (ad) => html`
<a class="card" href="/details/${ad.objectId}">
    <article class="preview">
        <div class="title">
            <h2>${ad.name}</h2>
            <h2>${ad.price} €</h2>
        </div>
        <div class="small"><img src=${ad.img}></div>
    </article>
</a>
`



export async function catalogPage(ctx) {
    const ads = await getAds();
    ctx.render(catalogTemplate(ads.results));
}