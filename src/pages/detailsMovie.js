import { showView } from "../app.js";
import { showHomePage } from "./home.js";
import { showEditMoviePage } from "./editMovie.js";

const detailsMovieView = document.querySelector('#movie-example');
export function showDetailsMoviePage(id) {
  displayMovie(id);
  showView(detailsMovieView);
}

function createMovieCard(movie, likes) {
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
              <span class="enrolled-span">Liked ${likes}</span>
            </div>
          </div>`


  return movieContainer;
}

function showButtons(movie, isliked) {

  const user = JSON.parse(localStorage.getItem('user'));
  const isOwner = user && user._id == movie._ownerId;

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
  likeBtn.style.display = 'none';
  likeBtn.addEventListener('click', (e) => {
    e.preventDefault();
    fetch(`http://localhost:3030/data/likes`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'X-authorization': user.accessToken,
      },
      body: JSON.stringify({ 'movieId': movie._id })
    })
      .then(response => response.json())
      .then(like => {
        showDetailsMoviePage(movie._id);
      })
      .catch(err => console.log(err))
  })

  if (user && isOwner) {
    deleteBtn.style.display = 'inline-block';
    editBtn.style.display = 'inline-block';
  } else if (user && !isOwner && !isliked) {
    likeBtn.style.display = 'inline-block';
  }
}

async function displayMovie(id) {
  const user = JSON.parse(localStorage.getItem('user'));
  const [movie, likes, ownLike] = await Promise.all([getMovie(id), getLikes(id), isliked(id, user)]);

  detailsMovieView.replaceChildren(createMovieCard(movie, likes));

  showButtons(movie, ownLike);
}

async function getMovie(id) {
  const response = await fetch(`http://localhost:3030/data/movies/${id}`);
  const movie = await response.json();

  return movie;
}

async function getLikes(id) {
  const response = await fetch(`http://localhost:3030/data/likes?where=movieId%3D%22${id}%22&distinct=_ownerId&count`);
  const likes = await response.json();

  return likes;
}

async function isliked(id, user) {
  if(!user) {
    return false;
  }
  const response = await fetch(`http://localhost:3030/data/likes?where=movieId%3D%22${id}%22%20and%20_ownerId%3D%22${user._id}%22`);
  const like = await response.json();

  return like.length > 0;
}