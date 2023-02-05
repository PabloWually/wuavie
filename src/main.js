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

function likedMoviesList(){
    const item = JSON.parse(localStorage.getItem('liked-movies'));
    let movies;

    if(item) {
        movies = item;
    } else {
        movies = {};
    }
    return movies;
}

function likeMovie(movie){
    const likedMovies = likedMoviesList();

    if(likedMovies[movie.id]){
        likedMovies[movie.id] = undefined;
    } else{
        likedMovies[movie.id] = movie;
    }

    localStorage.setItem('liked-movies', JSON.stringify(likedMovies))
}

async function getTrendingMoviesPreview(){
    const { data } = await api('trending/movie/week')
    const movies = data.results;
    maxPage = data.total_pages;
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
    maxPage = data.total_pages;
    console.log(data, data.results);    

    addImageMovies(genericSection, movies); 
}

function getPaginatedMoviesByCategories(id){
    return async function () {
        const {
            scrollTop,
            scrollHeight,
            clientHeight
        } = document.documentElement
    
        const scrollIsBottom = clientHeight + scrollTop >= scrollHeight - 20;
        const pageIsNotMax = page < maxPage;
        
        if (scrollIsBottom && pageIsNotMax){
            page++;
            const { data } = await api('/discover/movie', {
                params: {
                    'with_genres': id,
                    page,
                }
            });
            const movies = data.results;
            addImageMovies(genericSection, movies, false); 
        }
    }
}

async function getMoviesBySearch(query){
    const { data } = await api('/search/movie', {
        params: {
            query
        }
    });
    const movies = data.results;
    maxPage = data.total_pages;
    console.log(data, data.results);    

    addImageMovies(genericSection, movies); 
}


function getPaginatedMoviesBySearch(query){
    return async function () {
        const {
            scrollTop,
            scrollHeight,
            clientHeight
        } = document.documentElement
    
        const scrollIsBottom = clientHeight + scrollTop >= scrollHeight - 20;
        const pageIsNotMax = page < maxPage;
        
        if (scrollIsBottom && pageIsNotMax){
            page++;
            const { data } = await api('/search/movie', {
                params: {
					query,
                    page: page,
                },
            });
            const movies = data.results;
            console.log(data, data.results);
        
            addImageMovies(genericSection, movies, false); 
        }
    }
}

const lazyLoader = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
        if(entry.isIntersecting){
            const url = entry.target.getAttribute('data-img');
            entry.target.setAttribute('src', url);
        }
    });
});

function getLikedMovies(){
    const likedMovies = likedMoviesList();
    const arrayMoives = Object.values(likedMovies);

    addImageMovies(likedMoviesListArticle, arrayMoives, true);
}

function addImageMovies(container, movies, clean = true){
    if(clean){
        container.innerHTML = '';
    }

    movies.forEach(movie => {
        const movieContainer = document.createElement('div');
        // movieContainer.addEventListener('click', () => {
        //     location.hash = `movie=${movie.id}`
        // });
        movieContainer.classList.add('movie-container')
        const  movieImg = document.createElement('img');
        movieImg.addEventListener('click', () => {
            location.hash = `movie=${movie.id}`
        });
        movieImg.classList.add('movie-img');
        movieImg.setAttribute('alt', movie.title);
        movieImg.setAttribute('data-img','https://image.tmdb.org/t/p/w300'+ movie.poster_path)
        movieImg.addEventListener('error', () => {
            movieImg.setAttribute('src', 'https://img.freepik.com/free-vector/oops-404-error-with-broken-robot-concept-illustration_114360-5529.jpg?w=2000');
        });

        const movieButton = document.createElement('button');
        movieButton.classList.add('movie-btn');
        likedMoviesList()[movie.id] && movieButton.classList.add('movie-btn--liked');
        movieButton.addEventListener('click', () => {
            movieButton.classList.toggle('movie-btn--liked');
            likeMovie(movie);
        });
        
        lazyLoader.observe(movieImg);
        
        movieContainer.append(movieImg);
        movieContainer.append(movieButton);
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

async function getPaginatedTrendingMovies(){
    const {
        scrollTop,
        scrollHeight,
        clientHeight
    } = document.documentElement

    const scrollIsBottom = clientHeight + scrollTop >= scrollHeight - 20;
    const pageIsNotMax = page < maxPage;
    
    if (scrollIsBottom && pageIsNotMax){
        page++;
        const { data } = await api('trending/movie/week',{
            params: {
                page: page
            },
        })
        const movies = data.results;

        addImageMovies(genericSection, movies, false);
    }
}

async function getTrendingMovies(){
    const { data } = await api('trending/movie/week')
    const movies = data.results;

    addImageMovies(genericSection, movies);
}

async function getMovieById(id){
    const { data: movie } = await api(`/movie/${id}`);
    const movieImgUrl = 'https://image.tmdb.org/t/p/w500'  + movie.poster_path;
    movieDetailTitle.textContent = movie.title;
    movieDetailDescription.textContent = movie.overview;
    movieDetailScore.textContent = movie.vote_average;
    headerSection.style.background = `
    linear-gradient(180deg, rgba(0, 0, 0, 0.35) 19.27%, rgba(0, 0, 0, 0) 29.17%),
    url(${movieImgUrl})`;

    createCategorie(movieDetailCategoriesList, movie.genres);
    getRelatedMoviesById(movie.id);
}

async function getRelatedMoviesById(id){
    const { data } = await api(`movie/${id}/recommendations`);
    const relatedMovies = data.results;

    addImageMovies(relatedMoviesContainer, relatedMovies);

}
