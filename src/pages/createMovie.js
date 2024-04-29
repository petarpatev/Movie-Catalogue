import { showView } from "../app.js";

const addMovieView = document.querySelector('#add-movie');
export function showAddMoviePage() {
    showView(addMovieView);
}