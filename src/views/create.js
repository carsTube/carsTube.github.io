import { createAd } from '../data/data.js';
import { html } from '../lib.js'
import { createErrorModal } from '../middlewares.js';
import { getUserData } from '../util.js';

const createTemplate = (onSubmit, email) => html`
<section id="create">
    <article>
        <h2>New Ad</h2>
        <form id="createForm" @submit=${onSubmit}>
            <label>Name: <input type="text" name="name" placeholder="Ad name"></label>
            <label>Price: <input type="text" name="price" placeholder="Price"></label>
            <label>Year: <input type="text" name="year" placeholder="Year"></label>
            <label>Image: <input type="text" name="img" placeholder="Image URL"></label>
            <div class="radio-group">
                <label>Engine: </label>
                <input type="radio" id="option-one" name="engine" value="gasoline"><label for="option-one">Gasoline</label>
                <input type="radio" id="option-two" name="engine" value="diesel"><label for="option-two">Diesel</label>
                <input type="radio" id="option-three" name="engine" value="electrical"><label for="option-three">Electrical</label>
                <input type="radio" id="option-four" name="engine" value="hybrid"><label for="option-four">Hybrid</label>
            </div>
            <label>Phone: <input type="text" name="ownerPhone" placeholder="Enter phone for contact"></label>
            <label>Email: <input type="text" name="ownerEmail" .value=${email}> </label>
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

    ctx.render(createTemplate(onSubmit, userData.email));

    async function onSubmit(event) {
        event.preventDefault();

        const formData = new FormData(event.target);

        const name = formData.get('name').trim();
        const img = formData.get('img').trim();
        let price = formData.get('price').trim();
        let year = formData.get('year').trim();
        const description = formData.get('description').trim();
        const engine = formData.get('engine');
        const ownerEmail = formData.get('ownerEmail').trim();
        const ownerPhone = formData.get('ownerPhone').trim();

        if (name == '' || price == '' || year == '' || img == '' || ownerEmail == '' || ownerPhone == '') {
            return createErrorModal('Please fill all fields. Only description is optional.');
        }

        if (engine == null) {
            return createErrorModal('Please select engine type.');
        }

        if (isNaN(Number(price)) || Number(price) < 0 || isNaN(Number(year)) || Number(year) < 0) {
            return createErrorModal('Price and year must be positive numbers.');
        }

        year = Number(year)
        price = Number(price)

        const result = await createAd({ name, img, price, year, description, engine, ownerEmail, ownerPhone});
        ctx.page.redirect(`/details/${result.objectId}`);

    }
}