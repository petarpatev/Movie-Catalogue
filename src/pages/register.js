import { showView } from "../app.js";
import { updateNav } from "../app.js";
import { showHomePage } from "./home.js";

const registerView = document.querySelector('#form-sign-up');
export function showRegisterPage() {
    showView(registerView);
}

const url = 'http://localhost:3030/users/register';

const registerFormElement = registerView.querySelector('#register-form');
registerFormElement.addEventListener('submit', (e) => {
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
            registerFormElement.reset();
            updateNav();
            showHomePage();
        })
        .catch(err => console.log(err))
})