import './sass/main.scss';
import PixabayApiService from './pixabay-service';
import SimpleLightbox from "simplelightbox";
import "simplelightbox/dist/simple-lightbox.min.css";
import Notiflix from 'notiflix';
const axios = require('axios');
import templateFunction from './templates/render-card.hbs';

const form = document.getElementById('search-form');
const galleryContainer = document.querySelector('.gallery');
const loadMoreBtn = document.querySelector('.load-more');
const pixabayApiService = new PixabayApiService();

form.addEventListener('submit', onSearchFormSubmit);
loadMoreBtn.addEventListener('click', onLoadMore);

function onSearchFormSubmit(e) {
    e.preventDefault();

  pixabayApiService.query = e.currentTarget.elements.searchQuery.value.trim();
    pixabayApiService.resetPage();
    clearGalleryContainer();
    pixabayApiService.fetchArticles().then((hits) => console.log(hits));

  loadMoreBtn.classList.add('is-visible');
};

function onLoadMore() {
    pixabayApiService.fetchArticles().then(hits => console.log(hits));
};
function renderFotoCard(data) {
  galleryContainer.innerHTML = templateFunction(data);
}
function clearGalleryContainer() {
    // galleryContainer.innerHTML = '';
}




