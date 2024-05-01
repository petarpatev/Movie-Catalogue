import { showView } from "../app.js";
import { showHomePage } from "./home.js";

const addMovieView = document.querySelector('#add-movie');
export function showAddMoviePage() {
    showView(addMovieView);
}

const url = 'http://localhost:3030/data/movies';
const user = JSON.parse(localStorage.getItem('user'));
const createMovieFormElement = addMovieView.querySelector('#add-movie-form');
createMovieFormElement.addEventListener('submit', (e) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const title = formData.get('title');
    const description = formData.get('description');
    const img = formData.get('img');

    fetch(url, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'X-authorization': user.accessToken,
        },
        body: JSON.stringify({ title, description, img })
    })
        .then(response => response.json())
        .then(movie => {
            createMovieFormElement.reset();
            showHomePage();
        })
        .catch(err => console.log(err))
})