const axios = require('axios');
import SimpleLightbox from "simplelightbox";
import "simplelightbox/dist/simple-lightbox.min.css";
import Notiflix from 'notiflix';
import templateFunction from './templates/render-card.hbs';

const form = document.getElementById('search-form');
const galleryContainer = document.querySelector('.gallery');
const loadMoreBtn = document.querySelector('.load-more');

let searchQuery = '';
let page = 1;
let limit = 40;

form.addEventListener('submit', onSearchFormSubmit);
loadMoreBtn.addEventListener('click', onLoadMore);

function onSearchFormSubmit(e) {
    e.preventDefault();
    
    searchQuery = e.currentTarget.elements.searchQuery.value.trim();

  if (searchQuery === '') {
    loadMoreBtn.classList.remove('is-visible');
    galleryContainer.innerHTML = '';
    return Notiflix.Notify.failure("Sorry, there are no images matching your search query. Please try again.")
  }
    resetPage();
    fetchImages().then(hits => {
      if (hits.length === 0) {
      loadMoreBtn.classList.remove('is-visible');
      return Notiflix.Notify.failure("Sorry, there are no images matching your search query. Please try again.");
    }
      renderFotoCard(hits);
      var lightbox = new SimpleLightbox('.gallery a');
      
  })
  loadMoreBtn.classList.add('is-visible');
 };
 async function fetchImages() {
    
  const searchParams = new URLSearchParams({
      image_type: 'photo',
      orientation: "horizontal",
      safesearch: true,
      per_page: 40,
  });
  const BASE_URL = 'https://pixabay.com/api/';
  const API_KEY = '24463326-9b2d5a427846ea9fa30299421';

 const hits = await axios(`${BASE_URL}?key=${API_KEY}&q=${searchQuery}&page=${page}&${searchParams}`)
          .then(data => {
              let totalPages = data.data.totalHits / limit;
              if (page > totalPages) {
                  Notiflix.Notify.info("We're sorry, but you've reached the end of search results.");
                  loadMoreBtn.classList.remove('is-visible');
              }
          incrementPage();
          return data.data.hits;
          });
     return hits
}

  async function onLoadMore() {
 const pixabay = await fetchImages().then(hits => {
   
    renderFotoCard(hits);
    var lightbox = new SimpleLightbox('.gallery a');
    lightbox.refresh();
  })
  return pixabay;
};

function renderFotoCard(data) {
  galleryContainer.innerHTML = templateFunction(data);
}

function incrementPage() {
  page += 1;
}

function resetPage() {
  page = 1;
}







