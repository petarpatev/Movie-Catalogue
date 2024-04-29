import { showView } from "../app.js";

const loginView = document.querySelector('#form-login');
export function showLoginPage() {
    showView(loginView);
}