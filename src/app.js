import { showHomePage } from "./pages/home.js";
import { showLoginPage } from "./pages/login.js";
import { showRegisterPage } from "./pages/register.js";
import { showAddMoviePage } from "./pages/createMovie.js";

const navigationElement = document.querySelector('.container nav');
navigationElement.addEventListener('click', onNavigate);

//  Guest/User Nav
export function updateNav() {
    let guestNavElements = document.querySelectorAll('.guest');
    let userNavElements = document.querySelectorAll('.user');
    const welcomeElement = document.querySelector('#welcome-msg');
    const user = JSON.parse(localStorage.getItem('user'));

    if (user) {
        guestNavElements.forEach(x => x.style.display = 'none');
        userNavElements.forEach(x => x.style.display = 'block');
        welcomeElement.textContent = `Welcome, ${user.email}`;
    } else {
        guestNavElements.forEach(x => x.style.display = 'block');
        userNavElements.forEach(x => x.style.display = 'none');
        welcomeElement.textContent = 'Welcome, guest';
    }
}

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
    localStorage.removeItem('user');
    alert('Logged out!');
    updateNav();
    showLoginPage();
}

//Start the app with Home page
updateNav();
showHomePage();

