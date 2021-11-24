import './sass/main.scss';
import PixabayApiService from './pixabay-service';
import SimpleLightbox from "simplelightbox";
import "simplelightbox/dist/simple-lightbox.min.css";
import Notiflix from 'notiflix';
const axios = require('axios');
import templateFunction from './templates/gallery-card.hbs';

const form = document.getElementById('search-form');
const galleryContainer = document.querySelector('.gallery');
const loadMoreBtn = document.querySelector('.load-more');
const pixabayApiService = new PixabayApiService();

clearGalleryContainer();
form.addEventListener('submit', onSearchFormSubmit);
loadMoreBtn.addEventListener('click', onLoadMore);

function onSearchFormSubmit(e) {
    e.preventDefault();

    pixabayApiService.query = e.currentTarget.elements.searchQuery.value;
    pixabayApiService.resetPage();
    pixabayApiService.fetchArticles().then(data => renderFotoCard(data));
    
    
    // let lightbox = new SimpleLightbox('.gallery a');
    // lightbox.refresh();
};

function onLoadMore() {
    pixabayApiService.fetchArticles().then(renderFotoCard);
};
function renderFotoCard(data) {
    galleryContainer.insertAdjacentHTML('afterbegin', templateFunction(data));
}
function clearGalleryContainer() {
    galleryContainer.innerHTML = '';
}


