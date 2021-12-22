import { getAds } from '../data/data.js';
import { html, until } from '../lib.js';
import { getUserData } from '../util.js';
import { loadAds } from './catalog.js';
import { spinner } from '../middlewares.js';

const profileTemplate = (adsPromise, userData) => html`
<section id="profile">
    <div class="hero">
        <span>Greetings ${userData.username}</span>
        <span>Your email: ${userData.email}</span> 
    </div>
    <div class="hero"><h3>Your ads:</h3></div>
    ${until(adsPromise, spinner())}
    <footer><div class="hero"><a class="actionLink" href="/home">Go back to Home page</a></div></footer>
</section>
`


export async function profilePage(ctx) {
    const userData = getUserData();
    const adsPromise = getAds(1, '', false, true);
    ctx.render(profileTemplate(loadAds(adsPromise), userData));
}

