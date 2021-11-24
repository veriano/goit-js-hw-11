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
        console.log(this)
        const searchParams = new URLSearchParams({
            image_type: 'photo',
            orientation: "horizontal",
            safesearch: true,
            per_page: 40,
        });
        const BASE_URL = 'https://pixabay.com/api/';
        const API_KEY = '24463326-9b2d5a427846ea9fa30299421';

        return axios.get(`${BASE_URL}?key=${API_KEY}&q=${this.searchQuery}&page=${this.page}&${searchParams}`)
            .then(response => response.json)
            .then((data) => {
                this.incrementPage();
                if (this.page > this.totalPages) {
        Notiflix.Notify.info("We're sorry, but you've reached the end of search results.");
    }
                return data
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