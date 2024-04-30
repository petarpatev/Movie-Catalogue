import { showView } from "../app.js";
import { nav } from "../app.js";

const homeView = document.querySelector('#home-page');
export function showHomePage() {
    showView(homeView);
    nav();
    getMovies();
}

const moviesContainerElement = homeView.querySelector('#movies-list');

function getMovies() {
    const url = 'http://localhost:3030/data/movies';
    fetch(url)
        .then(response => response.json())
        .then(movies => {
            moviesContainerElement.innerHTML = '';
            addAllMovies(movies);
        })
        .catch(err => console.log(err))
}

function createMovieCard(movie) {
    const movieContainer = document.createElement('li');
    movieContainer.className = 'card mb-4';
    movieContainer.innerHTML = `
    <img class="card-img-top"  src=${movie.img} alt="Card image cap" width="400"/>
        <div class="card-body">
        <h4 class="card-title">${movie.title}</h4>
        <a href="#">
        </a>
        </div>
        <div class="card-footer">
        <button type="button" class="btn btn-info">Details</button>
        </div>`;

    return movieContainer;
}

function addAllMovies(movies) {
    const fragment = document.createDocumentFragment();
    movies.forEach(movie => {
        fragment.appendChild(createMovieCard(movie));
    })
    moviesContainerElement.appendChild(fragment);
}