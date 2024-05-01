import { showView } from "../app.js";
import { showHomePage } from "./home.js";
import { updateNav } from "../app.js";

const loginView = document.querySelector('#form-login');
export function showLoginPage() {
    showView(loginView);
}

const url = 'http://localhost:3030/users/login';

const loginFormElement = loginView.querySelector('#login-form');
loginFormElement.addEventListener('submit', (e) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const email = formData.get('email');
    const password = formData.get('password');

    fetch(url, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password })
    })
        .then(response => response.json())
        .then(user => {
            localStorage.setItem('user', JSON.stringify(user));
            loginFormElement.reset();
            updateNav();
            showHomePage();
        })
        .catch(err => console.log(err))
})