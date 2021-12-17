import { getAdById, updateAd } from '../data/data.js';
import { html } from '../lib.js'
import { createErrorModal } from '../middlewares.js';

const editTemplate = (ad, onSubmit) => html`
<section id="edit">
    <article>
        <h2>Edit Ad</h2>
        <form id="editForm" @submit=${onSubmit}>
            <label>Name: <input type="text" name="name" placeholder="Ad name" .value=${ad.name}></label>
            <label>Price: <input type="text" name="price" placeholder="Price" .value=${ad.price}></label>
            <label>Year: <input type="text" name="year" placeholder="Year" .value=${ad.year}></label>
            <label>Image: <input type="text" name="img" placeholder="Image URL" .value=${ad.img}></label>
            <label class="ml">Description: <textarea name="description"
                    placeholder="Describe the car" .value=${ad.description}></textarea></label>
            <input type="submit" value="Save Changes">
        </form>
    </article>
</section>
`

export async function editPage(ctx) {
    const ad = await getAdById(ctx.params.id)
    ctx.render(editTemplate(ad, onSubmit));

    async function onSubmit(event) {
        event.preventDefault();

        const formData = new FormData(event.target);

        const name = formData.get('name').trim();
        const img = formData.get('img').trim();
        let price = formData.get('price').trim();
        let year = formData.get('year').trim();
        const description = formData.get('description').trim();

        if (name == '' || price == '' || year == '' || img == '') {
            return createErrorModal('Please fill all fields. Only description is optional.');
        }

        if (isNaN(Number(price)) || Number(price) < 0 || isNaN(Number(year)) || Number(year) < 0) {
            return createErrorModal('Price and year must be positive numbers.');
        }

        year = Number(year)
        price = Number(price)

        updateAd(ctx.params.id, { name, img, price, year, description });
        ctx.page.redirect(`/details/${ctx.params.id}`);
    }
}