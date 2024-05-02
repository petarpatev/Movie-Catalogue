import { showView } from "../app.js";
import { showHomePage } from "./home.js";
import { showEditMoviePage } from "./editMovie.js";

const detailsMovieView = document.querySelector('#movie-example');
export function showDetailsMoviePage(id) {
  getMovie(id);
  showView(detailsMovieView)
}

function getMovie(id) {
  const url = `http://localhost:3030/data/movies/${id}`;
  fetch(url)
    .then(response => response.json())
    .then(movie => {
      detailsMovieView.replaceChildren(createMovieCard(movie));
      showButtons(movie);
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
              <a class="btn btn-danger delete" href="#">Delete</a>
              <a class="btn btn-warning edit" href="#">Edit</a>
              <a class="btn btn-primary like" href="#">Like</a>
              <span class="enrolled-span">Liked 1</span>
            </div>
          </div>`


  return movieContainer;
}

function showButtons(movie) {
  const deleteBtn = document.querySelector('.delete');
  deleteBtn.style.display = 'none';
  deleteBtn.addEventListener('click', (e) => {
    e.preventDefault();
    fetch(`http://localhost:3030/data/movies/${movie._id}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        'X-authorization': user.accessToken,
      }
    })
      .then(response => response.json())
      .then(movie => console.log(movie))
      .catch(err => console.log(err))
    showHomePage();
  })
  const editBtn = document.querySelector('.edit');
  editBtn.style.display = 'none';
  editBtn.addEventListener('click', (e) => {
    e.preventDefault();
    showEditMoviePage(movie, user);
  })
  const likeBtn = document.querySelector('.like');
  // likeBtn.style.display = 'none';

  const user = JSON.parse(localStorage.getItem('user'));
  const isOwner = user && user._id == movie._ownerId;
  console.log(user, movie, isOwner)

  if (user && isOwner) {
    deleteBtn.style.display = 'inline-block';
    editBtn.style.display = 'inline-block';
  }
}