import { login } from '../data/data.js';
import { html } from '../lib.js'


const loginTemplate = (onSubmit) => html`
<section id="login">
    <article>
        <h2>Login</h2>
        <form id="loginForm" @submit=${onSubmit}>
            <label>Username <input type="text" name="username"></label>
            <label>Password: <input type="password" name="password"></label>
            <input type="submit" value="Login">
        </form>
        <h3>Don't have an account ? Click <a href="/register">here</a></h3>
    </article>
</section>`;


export async function loginPage(ctx){
    ctx.render(loginTemplate(onSubmit))

    async function onSubmit(event){
        event.preventDefault();
        const formData = new FormData(event.target);
        
        const username = formData.get('username').trim();
        const password = formData.get('password').trim();

        await login(username, password);
        ctx.updateUserNav();
        ctx.page.redirect('/');

    }
}




