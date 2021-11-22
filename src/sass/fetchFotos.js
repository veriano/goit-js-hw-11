export  function fetchFotos(event) {
     const searchParams = new URLSearchParams({
    orientation: "horizontal",
    safesearch: true,
});
    const API_KEY = '24463326-9b2d5a427846ea9fa30299421';
    fetch(`https://pixabay.com/api/?key=${API_KEY}&q=${event}&image_type=photo&${searchParams}`)
     .then(response => {
    if (!response.ok) {
      Notiflix.Notify.failure('Sorry, there are no images matching your search query. Please try again.');
    }
    return response.json();
  })
}