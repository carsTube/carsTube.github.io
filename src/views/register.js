import { register } from '../data/user.js';
import { html } from '../lib.js'
import { createErrorModal } from '../middlewares.js';


const registerTemplate = (onSubmit) => html`
<section id="register">
    <article>
        <h2>Register</h2>
        <form id="registerForm" @submit=${onSubmit}>
            <label>Username: <input type="text" name="username"></label>
            <label>E-mail: <input type="text" name="email"></label>
            <label>Password: <input type="password" name="password"></label>
            <label>Repeat: <input type="password" name="rePass"></label>
            <input type="submit" value="Register">
        </form>
        <h3>Already have an account? Click <a href="/login">here</a></h3>
    </article>
</section>`;


export async function registerPage(ctx) {
    ctx.render(registerTemplate(onSubmit))

    async function onSubmit(event) {
        event.preventDefault();
        const formData = new FormData(event.target);

        const username = formData.get('username').trim();
        const email = formData.get('email').trim();
        const password = formData.get('password').trim();
        const repass = formData.get('rePass').trim();

        if (username == '' || email == '' || password == '' || repass == '') {
            return createErrorModal('All fields are required!')
        }

        if (password != repass) {
            return createErrorModal('Passwords don\'t match !')
        }

        await register(username, email, password);
        ctx.updateUserNav();
        ctx.page.redirect('/');

    }
}




