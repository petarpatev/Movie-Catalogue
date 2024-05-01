import { showView } from "../app.js";
import { showDetailsMoviePage } from "./detailsMovie.js";

const homeView = document.querySelector('#home-page');
export function showHomePage() {
    getMovies();
    showView(homeView);
}

const moviesContainerElement = homeView.querySelector('#movies-list');

moviesContainerElement.addEventListener('click', (e) => {
    e.preventDefault();
    if (e.target.tagName == 'BUTTON') {
        showDetailsMoviePage(e.target.dataset.id);
    }
})

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
        </div>
        <div class="card-footer">
        <a href="/details/${movie._id}">
        <button data-id=${movie._id} type="button" class="btn btn-info">Details</button>
        </a>
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