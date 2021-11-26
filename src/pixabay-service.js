const axios = require('axios');

export default class PixabayApiService {
    constructor() {
        this.searchQuery = '';
        this.page = 1;
    }
   async fetchImages() {
    
        const searchParams = new URLSearchParams({
            image_type: 'photo',
            orientation: "horizontal",
            safesearch: true,
            per_page: 40,
        });
        const BASE_URL = 'https://pixabay.com/api/';
        const API_KEY = '24463326-9b2d5a427846ea9fa30299421';

       const hits = await axios.get(`${BASE_URL}?key=${API_KEY}&q=${this.searchQuery}&page=${this.page}&${searchParams}`)
                .then(data => {
                this.incrementPage();
                return data.data.hits;
                });
       return hits;
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