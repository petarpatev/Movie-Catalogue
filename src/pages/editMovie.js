import { showView } from "../app.js";

const editMovieView = document.querySelector('#edit-movie');
export function showEditMoviePage() {
    showView(editMovieView);
}