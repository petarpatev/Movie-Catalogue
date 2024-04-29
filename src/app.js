import { showHomePage } from "./pages/home.js";
import { showLoginPage } from "./pages/login.js";
import { showRegisterPage } from "./pages/register.js";
import { showAddMoviePage } from "./pages/createMovie.js";

const navigationElement = document.querySelector('.container nav');
navigationElement.addEventListener('click', onNavigate);

const addMovieBtn = document.querySelector('#add-movie-button .btn.btn-warning');
addMovieBtn.addEventListener('click', onNavigate);

function hideAllViews() {
    const views = [...document.querySelectorAll('.view-section')];
    views.forEach(view => view.style.display = 'none');
}

export function showView(view) {
    hideAllViews();
    view.style.display = 'block';
}

const routes = {
    '/': showHomePage,
    '/login': showLoginPage,
    '/register': showRegisterPage,
    '/logout': logout,
    '/create': showAddMoviePage,
}

function onNavigate(e) {
    e.preventDefault();
    if (e.target.tagName == 'A' && e.target.href) {
        const url = new URL(e.target.href);
        const view = routes[url.pathname];
        if (typeof view == 'function') {
            view();
        }
    }
}

//Logout
function logout() {
    alert('Logged out!');
    showHomePage();
}

//Start the app with Home page
showHomePage();

