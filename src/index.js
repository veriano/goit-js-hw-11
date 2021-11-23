import './sass/main.scss';
import SimpleLightbox from "simplelightbox";
import "simplelightbox/dist/simple-lightbox.min.css";
import Notiflix from 'notiflix';
const axios = require('axios');
import templateFunction from './templates/gallery-card.hbs';

const form = document.getElementById('search-form');
const input = form.elements.searchQuery;
const gallery = document.querySelector('.gallery');
let page = 1;
let limitPerPage = 40;
const totalEmages = 500;
const totalPages = totalEmages/ limitPerPage;

form.addEventListener('submit', onSearchFormSubmit);

function onSearchFormSubmit(e) {
    e.preventDefault();
    const event = e.target.elements.searchQuery.value;

    if (page > totalPages) {
        Notiflix.Notify.info("We're sorry, but you've reached the end of search results.");
    }
    fetchFotos(event)
    .then(response => {
        const markup = templateFunction(response);
        gallery.innerHTML = markup;
    })
    .catch(error => console.log(error));
    
    
    // let lightbox = new SimpleLightbox('.gallery a');
    // lightbox.refresh();
};

async function fetchFotos(event) {
    page += 1;
    
        const searchParams = new URLSearchParams({
            image_type: 'photo',
            orientation: "horizontal",
            safesearch: true,
            page: 1,
            per_page: 40,
        });
        const headers = {
            "Content-Type": "Application/blob",
        };
        const BASE_URL = 'https://pixabay.com/api/';
        const API_KEY = '24463326-9b2d5a427846ea9fa30299421';

        const response = await axios.get(`${BASE_URL}?key=${API_KEY}&q=${event}&${searchParams},${headers}`);
        return response.blob();
        
};

