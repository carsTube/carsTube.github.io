import { getAds } from '../data/data.js';
import { html, until } from '../lib.js';
import { getUserData } from '../util.js';
import { adCard, loadAds } from './catalog.js';
import { createErrorModal } from '../middlewares.js';


const profileTemplate = (ads, userData) => html`
<section id="profile">
    <div class="hero">
        <span>Greetings ${userData.username}</span>
        <span>Your email: ${userData.email}</span> 
        ${ads.length == 0 ? html`<span>Youd dont have any published ads.<a class="actionLink" href="/create">Add ad</a></span>` : html`<span>Your published ads: ${ads.length}</span>`}
    </div>
    <div>${ads.map(adCard)}</div>
    <footer><div class="hero"><a class="actionLink" href="/home">Go back to Home page</a></div></footer>
</section>`


export async function profilePage(ctx) {
    const userData = getUserData();
    if (userData) {
        const ads = await getAds(1, '', true, false);
        ctx.render(profileTemplate(ads.results, userData));
    } else {
        ctx.page.redirect('/login');
    }
}

