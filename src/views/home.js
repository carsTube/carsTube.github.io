import { getAds, getRecentAds } from '../data/data.js';
import { html } from '../lib.js'
import { adCard } from './catalog.js';

const homeTemplate = (recentAds) => html`
<section id="home">
    <div class="hero">
        <h2>Find the best car for you <a href="/catalog">&#128270;</a></h2>
    </div>
    <div class="background">
        <img src="/assets/background1.jpg" class="backgroundImg">
    </div>
        ${recentAds.map(adCard)}
    </div>
</section>`



export async function homePage(ctx) {
    const recentAds = await getRecentAds();
    ctx.render(homeTemplate(recentAds.results));

    
    
}