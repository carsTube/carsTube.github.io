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
        <span>Your published ads: ${ads.length}</span> 
    </div>
    
    ${ads.length == 0 ? html `${createErrorModal('You dont have any ads. Go to Create Ad to publish new Ads.')}` : 
    html`<div class="hero"><h3>Your ads:</h3></div>
    ${ads.map(adCard)}`}
    
    <footer><div class="hero"><a class="actionLink" href="/home">Go back to Home page</a></div></footer>
</section>
`


export async function profilePage(ctx) {
    const userData = getUserData();
    const ads = await getAds(1, '', false, true);
    ctx.render(profileTemplate(ads.results, userData));
}

