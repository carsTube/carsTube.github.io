import { getAds } from '../data/data.js';
import { html, until } from '../lib.js'
import { spinner } from '../middlewares.js';
import { parseQuery } from '../util.js';

const catalogTemplate = (adsPromise, onSearch, pager, search = '', showFilters, onFilter) => html`
<section id="catalog">
    <div><a class="actionLink" href="javascript:void(0)" @click=${(event)=> showFilters(event)}>Select Filters</a></div>
    <div class="filters" @click=${(event)=> onFilter(event)}>
        <button class="actionLink" value="price">Price Ascending</button>
        <button class="actionLink" value="-price">Price Descending</button>
        <button class="actionLink" value="year">Year Ascending</button>
        <button class="actionLink" value="-year">Year Descending</button>
        <button class="actionLink" value="name">Name Ascending</button>
        <button class="actionLink" value="-name">Name Descending</button>
    </div>
    <div class="section-title">
        <form id="searchForm" @submit=${onSearch}>
            <input type="text" name="search" .value=${search} placeholder="&#x1F50D Enter ad's name..">
            <input type="submit" value="Search">
        </form>
    </div>

    ${until(adsPromise, spinner())}

    <footer class="section-title">
        ${until(pager(), spinner())}
    </footer>
</section>`


export const adCard = (ad) => html`
<a class="card" href="/details/${ad.objectId}">
    <article class="preview" style="display: inline-block">
        <div class="title">
            <h2>${ad.name}</h2>
            <h2>${ad.price} €</h2>
        </div>
        <div class="small"><img src=${ad.img}></div>
    </article>
</a>
`

function pagerSetup(page, adsPromise, search) {
    return async () => {
        const { pages } = await adsPromise;

        return html`
            Page ${page} of ${pages}
            ${page > 1 ? html`&#x21e6;<a class="pager" href=${'/catalog/' + createQuery(Number(page) - 1, search)}>
                Previous page</a>` : ''}
            ${page < pages ? html`<a class="pager" href=${'/catalog/' + createQuery(Number(page) + 1, search)}>Next page
                </a>&#x21e8;` : ''}`;
    };
}


function createQuery(page, search) {
    return `?page=${page}${(search ? `&search=${search}` : '')}`;
}

export async function catalogPage(ctx) {
    const { page, search } = parseQuery(ctx.querystring);
    const adsPromise = getAds(page || 1, search || '', false, false, '-createdAt');

    ctx.render(catalogTemplate(loadAds(adsPromise), onSearch, pagerSetup(page || 1, adsPromise, search), search, showFilters, onFilter));

    function onSearch(event) {
        event.preventDefault();
        const formData = new FormData(event.target);
        const search = formData.get('search')

        if (search) {
            ctx.page.redirect(`/catalog?search=${encodeURIComponent(search)}`);
        } else {
            ctx.page.redirect('/catalog');
        }
    }

    async function onFilter(event) {
        if (event.target.nodeName == 'BUTTON') {
            const orderBy = event.target.value
            const adsPromise = getAds(page || 1, search || '', false, false, orderBy);
            ctx.render(catalogTemplate(loadAds(adsPromise), onSearch, pagerSetup(page || 1, adsPromise, search), search, showFilters, onFilter));
        }
    }
}



export async function loadAds(adsPromise) {
    const { results: ads } = await adsPromise;
    return ads.map(adCard);
}


function showFilters(event) {
    const filters = document.querySelector('.filters');

    if (event.target.textContent == 'Select Filters') {
        filters.style.display = 'block';
        event.target.textContent = 'Hide Filters';
    } else {
        filters.style.display = 'none';
        event.target.textContent = 'Select Filters';
    }
}

