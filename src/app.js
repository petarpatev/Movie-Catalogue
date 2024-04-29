function hideAllViews() {
    const views = [...document.querySelectorAll('.view-section')];
    views.forEach(view => view.style.display = 'none');
}

function showView(view) {
    view.style.display = 'block';
}

const homeView = document.querySelector('#home-page');
function showHomePage() {
    showView(homeView);
}

const loginView = document.querySelector('#form-login');
function showLoginPage() {
    showView(loginView);
}

const registerView = document.querySelector('#form-sign-up');
function showRegisterPage() {
    showView(registerView);
}

const addMovieView = document.querySelector('#add-movie');
function showAddMoviePage() {
    showView(addMovieView);
}

const editMovieView = document.querySelector('#edit-movie');
function showEditMoviePage() {
    showView(editMovieView);
}

const detailsMovieView = document.querySelector('#movie-example');
function showDetailsMoviePage() {
    showView(detailsMovieView)
}

function logout() {
    alert('Logged out!');
    showHomePage();
}

const routes = {
    '/': showHomePage,
    '/login': showLoginPage,
    '/register': showRegisterPage,
    '/logout': logout,
    '/create': showAddMoviePage,
}

hideAllViews();
showHomePage();

const navigationElement = document.querySelector('.container nav');
navigationElement.addEventListener('click', onNavigate);

const addMovieBtn = document.querySelector('#add-movie-button .btn.btn-warning');
addMovieBtn.addEventListener('click', onNavigate);

function onNavigate(e) {
    e.preventDefault();
    if (e.target.tagName == 'A' && e.target.href) {
        const url = new URL(e.target.href);
        const view = routes[url.pathname];
        if (typeof view == 'function') {
            hideAllViews();
            view();
        }
    }
}

