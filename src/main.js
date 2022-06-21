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

    addImageMovies(trendingMoviesPreviewList, movies);
}

async function getCategoriesPreview(){
    const { data } = await api('genre/movie/list')
    const categories = data.genres;
    console.log(data);

    createCategorie(categoriesPreviewList, categories); 
}

async function getMoviesByCategories(id){
    const { data } = await api('/discover/movie', {
        params: {
            'with_genres': id
        }
    });
    const movies = data.results;
    console.log(data, data.results);    

    addImageMovies(genericSection, movies); 
}

async function getMoviesBySearch(query){
    const { data } = await api('/search/movie', {
        params: {
            query
        }
    });
    const movies = data.results;
    console.log(data, data.results);    

    addImageMovies(genericSection, movies); 
}

function addImageMovies(container, movies){
    container.innerHTML = '';
    movies.forEach(movie => {
        const movieContainer = document.createElement('div');
        movieContainer.classList.add('movie-container')
        const  movieImg = document.createElement('img');
        movieImg.classList.add('movie-img')
        movieImg.setAttribute('alt', movie.title);
        movieImg.setAttribute('src','https://image.tmdb.org/t/p/w300'+ movie.poster_path)
        movieContainer.append(movieImg);
        container.append(movieContainer);
    }); 
}

function createCategorie(container, categories){
    container.innerHTML = '';
    
    categories.forEach(category => {
        const categoryContainer = document.createElement('div');
        categoryContainer.classList.add('category-container')
        const  categoryTitle = document.createElement('h3');
        categoryTitle.classList.add('category-title')
        categoryTitle.setAttribute('id', `id${category.id}`);
        categoryTitle.addEventListener('click', () => location.hash = `#categories=${category.id}-${category.name}`)
        const categoryTitleText = document.createTextNode(category.name);
        categoryTitle.append(categoryTitleText);
        categoryContainer.append(categoryTitle);
        container.append(categoryContainer);
    });
}

async function getTrendingMovies(){
    const { data } = await api('trending/movie/week')
    const movies = data.results;
    console.log(data, data.results);

    addImageMovies(genericSection, movies);
}
