import Notiflix from 'notiflix';

const axios = require('axios');

export default class PixabayApiService {
    constructor() {
        this.searchQuery = '';
        this.page = 1;
        this.limitPerPage = 40;
        this.totalEmages = 500;
        this.totalPages = this.totalEmages / this.limitPerPage;
    }
    fetchArticles() {
        console.log(this);
        const options = {
            image_type: 'photo',
            orientation: "horizontal",
            safesearch: true,
            per_page: 40,
        };
        const BASE_URL = 'https://pixabay.com/api/';s
        const API_KEY = '24463326-9b2d5a427846ea9fa30299421';

        return axios.get(`${BASE_URL}?key=${API_KEY}&q=${this.searchQuery}&page=${this.page}&${options}`)
            .then(response => response.json())
            .then(({hits}) => {
                this.incrementPage();
                if (this.page > this.totalPages) {
        Notiflix.Notify.info("We're sorry, but you've reached the end of search results.");
    } else if (data.hits.lenght === 0) {
        Notiflix.Notify.failure('Sorry, there are no images matching your search query. Please try again.');
    }

     return hits
    }).catch(error => console.log(error));
    }
    incrementPage() {
        this.page += 1;
    }
    resetPage() {
        this.page = 1;
    }
    get query (){
        return this.searchQuery;
    }
    set query (newQuery){
        this.searchQuery = newQuery;
    }

}