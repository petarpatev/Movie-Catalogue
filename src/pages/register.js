import { showView } from "../app.js";

const registerView = document.querySelector('#form-sign-up');
export function showRegisterPage() {
    showView(registerView);
}