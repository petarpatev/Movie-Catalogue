import { showView } from "../app.js";
import { showDetailsMoviePage } from "./detailsMovie.js";

const editMovieView = document.querySelector('#edit-movie');
export function showEditMoviePage(movie, user) {
    showView(editMovieView);
    editMovie(movie, user);
}

const inputTitleElement = editMovieView.querySelector('#edit-title');
const inputDescrElement = editMovieView.querySelector('#edit-description');
const inputImgElement = editMovieView.querySelector('#edit-imageUrl');

function editMovie(movie, user) {
    inputTitleElement.value = movie.title;
    inputDescrElement.value = movie.description;
    inputImgElement.value = movie.img;

    const submitBtn = editMovieView.querySelector('button[type="submit"]');
    submitBtn.addEventListener('click', (e) => {
        e.preventDefault();

        fetch(`http://localhost:3030/data/movies/${movie._id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                'X-authorization': user.accessToken,
            },
            body: JSON.stringify({
                'title': inputTitleElement.value,
                'description': inputDescrElement.value,
                'img': inputImgElement.value
            })
        })
            .then(response => response.json())
            .then(movie => console.log(movie))
            .catch(err => console.log(err))
        
        showDetailsMoviePage(movie._id);
    })
}

