import './sass/main.scss';
import PixabayApiService from './pixabay-service';
import SimpleLightbox from "simplelightbox";
import "simplelightbox/dist/simple-lightbox.min.css";
import Notiflix from 'notiflix';
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
  if (pixabayApiService.query === '') {
    return Notiflix.Notify.failure("Sorry, there are no images matching your search query. Please try again.")
  }
    pixabayApiService.resetPage();
    pixabayApiService.fetchImages().then(hits => {
    if (hits.length === 0) {
      loadMoreBtn.classList.remove('is-visible');
      return Notiflix.Notify.failure("Sorry, there are no images matching your search query. Please try again.");
    }
      renderFotoCard(hits);
      var lightbox = new SimpleLightbox('.gallery a');
  })
  loadMoreBtn.classList.add('is-visible');
 };
  
function onLoadMore() {
  pixabayApiService.fetchImages().then(hits => {
    renderFotoCard(hits);
    var lightbox = new SimpleLightbox('.gallery a');
    lightbox.refresh();
  })
    .catch(loadMoreBtn.classList.remove('is-visible'),
  Notiflix.Notify.info("We're sorry, but you've reached the end of search results."))
};
function renderFotoCard(data) {
  galleryContainer.innerHTML = templateFunction(data);
}





