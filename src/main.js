const API_URL = 'https://api.themoviedb.org/3/trending/movie/week?api_key=';
const API_URL_CATEGORIES = 'https://api.themoviedb.org/3/genre/movie/list?api_key=';

const api = axios.create({
    baseURL: 'https://api.themoviedb.org/3',
    headers: {
        'Content-Type': 'aplication/json;charset=utf=8'
    },
    params: {
        'api_key': API_KEY
    }
});

async function getTrendingMoviesPreview(){
    const { data } = await api('trending/movie/week')
    const movies = data.results;
    console.log(data, data.results);

    movies.forEach(movie => {
        const trendingMovieContainer = document.querySelector('#trendingPreview .trendingPreview-movieList')
        const movieContainer = document.createElement('div');
        movieContainer.classList.add('movie-container')
        const  movieImg = document.createElement('img');
        movieImg.classList.add('movie-img')
        movieImg.setAttribute('alt', movie.title);
        movieImg.setAttribute('src','https://image.tmdb.org/t/p/w300'+ movie.poster_path)
        movieContainer.append(movieImg);
        trendingMovieContainer.append(movieContainer);
    });  
}

async function getCategoriesPreview(){
    const { data } = await api('genre/movie/list')
    const categories = data.genres;
    console.log(data);

    categories.forEach(category => {
        const previewCategoriesContainer = document.querySelector('#categoriesPreview .categoriesPreview-list')
        const categoryContainer = document.createElement('div');
        categoryContainer.classList.add('category-container')
        const  categoryTitle = document.createElement('h3');
        categoryTitle.classList.add('category-title')
        categoryTitle.setAttribute('id', `id${category.id}`);
        const categoryTitleText = document.createTextNode(category.name);
        categoryTitle.append(categoryTitleText);
        categoryContainer.append(categoryTitle);
        previewCategoriesContainer.append(categoryContainer);
    });  
}


getTrendingMoviesPreview();
getCategoriesPreview();