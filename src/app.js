import { updateUserNav } from "./util.js";
import {page, render} from './lib.js';
import { homePage } from "./views/home.js";
import { catalogPage } from "./views/catalog.js";
import { loginPage } from "./views/login.js";
import { logout } from "./data/data.js";
import { registerPage } from "./views/register.js";
import { detailsPage } from "./views/details.js";
import { createPage } from "./views/create.js";
import { editPage } from "./views/edit.js";

const main = document.querySelector('main')
document.getElementById('logoutBtn').addEventListener('click', onLogout);

page(decorateContext);
page('/', homePage);
page('/home', homePage);
page('/catalog', catalogPage);
page('/create', createPage);
page('/login', loginPage);
page('/register', registerPage);
page('/details/:id', detailsPage);
page('/edit/:id', editPage);




page.start();
updateUserNav();


function decorateContext(ctx, next){
    ctx.render = (content) => render(content, main);
    ctx.updateUserNav = updateUserNav;

    next();
}


function onLogout() {
    logout();
    updateUserNav();
}