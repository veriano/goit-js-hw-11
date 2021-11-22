import './sass/main.scss';
import SimpleLightbox from "simplelightbox";
import "simplelightbox/dist/simple-lightbox.min.css";
import Notiflix from 'notiflix';
const axios = require('axios');
import templateFunction from './templates/gallery-card.hbs';
import { fetchFotos }  from "./fetchFotos";

const form = document.getElementById('search-form');
const gallery = document.querySelector('.gallery');

form.addEventListener('submit', onSearchFormSubmit);

function onSearchFormSubmit(e) {
    const event = e.target.elements.searchQuery.value;
     fetchFotos(event)
   

    
};

