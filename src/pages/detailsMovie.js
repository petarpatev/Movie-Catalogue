import { showView } from "../app.js";

const detailsMovieView = document.querySelector('#movie-example');
export function showDetailsMoviePage(id) {
    getMovie(id);
    showView(detailsMovieView)
}

export function getMovie(id) {
    const url = `http://localhost:3030/data/movies/${id}`;
    fetch(url)
        .then(response => response.json())
        .then(movie => {
            detailsMovieView.replaceChildren(createMovieCard(movie));
        })
        .catch(err => console.log(err))
}

function createMovieCard(movie) {
    const movieContainer = document.createElement('div');
    movieContainer.className = 'container';
    movieContainer.innerHTML = `
    <div class="row bg-light text-dark">
            <h1>Movie title: ${movie.title}</h1>

            <div class="col-md-8">
              <img
                class="img-thumbnail"
                src=${movie.img}
                alt="Movie"
              />
            </div>
            <div class="col-md-4 text-center">
              <h3 class="my-3">Movie Description</h3>
              <p>
                ${movie.description}
              </p>
              <a class="btn btn-danger" href="#">Delete</a>
              <a class="btn btn-warning" href="#">Edit</a>
              <a class="btn btn-primary" href="#">Like</a>
              <span class="enrolled-span">Liked 1</span>
            </div>
          </div>`


    return movieContainer;
}