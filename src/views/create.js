import { createAd } from '../data/data.js';
import { html } from '../lib.js'
import { createErrorModal } from '../middlewares.js';
import { getUserData } from '../util.js';

const createTemplate = (onSubmit) => html`
<section id="create">
    <article>
        <h2>New Ad</h2>
        <form id="createForm" @submit=${onSubmit}>
            <label>Name: <input type="text" name="name" placeholder="Ad name"></label>
            <label>Price: <input type="text" name="price" placeholder="Price"></label>
            <label>Year: <input type="text" name="year" placeholder="Year"></label>
           
            <label>Image: <input type="text" name="img" placeholder="Image URL"></label>
            <label class="ml">Description: <textarea name="description"
                    placeholder="Describe the car"></textarea></label>
            <input type="submit" value="Create Ad">
        </form>
    </article>
</section>
`

export async function createPage(ctx) {
    const userData = getUserData();
    if (userData == null) {
        ctx.page.redirect('/login');
    }

    ctx.render(createTemplate(onSubmit));

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

        const result = await createAd({ name, img, price, year, description });
        ctx.page.redirect(`/details/${result.objectId}`);

    }
}