import { getAds } from '../data/data.js';
import { html } from '../lib.js'
import { adCard } from './catalog.js';

const homeTemplate = (recentAds) => html`
<section id="home">
    <div class="hero">
        <h2>Find the best car for you <a href="/catalog">&#x1F50E</a></h2>
    </div>
    <div class="background">
        <img src="/assets/background1.jpg" class="backgroundImg">
    </div>
    <footer class="section-title">
        ${recentAds.map(adCard)}
    </footer>
</section>`



export async function homePage(ctx) {
    const recentAds = await getAds(0, 0, true);
    ctx.render(homeTemplate(recentAds.results));

    
    
}