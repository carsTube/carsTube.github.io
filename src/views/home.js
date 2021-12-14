import { getAds } from '../data/data.js';
import { html } from '../lib.js'

const homeTemplate = () => html`
<section id="home">
    <div class="hero">
        <h2>Find the best car for you <a href="/catalog">&#x1F50E</a></h2>
    </div>
    <div class="background">
        <img src="/assets/background1.jpg" class="backgroundImg">
    </div>
    <footer class="section-title">
        <p>Find your car at <a href="/catalog">Catalog</a></p>
    </footer>
</section>`



export async function homePage(ctx) {
    ctx.render(homeTemplate());
}