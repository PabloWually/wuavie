let  page = 1;
let InfiniteScroll;
let maxPage;

searchFormBtn.addEventListener('click', () => location.hash = `#search=${searchFormInput.value}`)
trendingBtn.addEventListener('click', () => location.hash = '#trends');
arrowBtn.addEventListener('click', () => {
    history.back();
    // location.hash = '#home'
});

window.addEventListener('DOMContentLoaded', navigator, false);
window.addEventListener('hashchange', navigator, false);
window.addEventListener('scroll', InfiniteScroll, false);

function navigator() {
    console.log({ location });

    if(InfiniteScroll){
        window.removeEventListener('scroll', InfiniteScroll, { passive: false });
        InfiniteScroll = undefined;
    }
    
    if(location.hash.startsWith('#trends')){
        trendsPage();
    } else if(location.hash.startsWith('#search=')){
        searchPage();
    } else if(location.hash.startsWith('#movie=')){
        moviesPage();
    } else if(location.hash.startsWith('#categories=')){
        categoriesPage();
    } else {
        homePage();
    }
    document.documentElement.scrollTop = 0;
    console.log(InfiniteScroll)
    if(InfiniteScroll){
        window.addEventListener('scroll', InfiniteScroll, { passive: false });
    }
}

function homePage(){
    console.log('home');

    headerSection.classList.remove('header-container--long');
    headerSection.style.background = '';
    arrowBtn.classList.add('inactive');
    arrowBtn.classList.remove('header-arrow--white');
    headerCategoryTitle.classList.add('inactive');
    headerTitle.classList.remove('inactive');
    searchForm.classList.remove('inactive');

    trendingPreviewSection.classList.remove('inactive');
    likedMoviesSection.classList.remove('inactive');
    categoriesPreviewSection.classList.remove('inactive');
    genericSection.classList.add('inactive')
    movieDetailSection.classList.add('inactive')

    getTrendingMoviesPreview();
    getCategoriesPreview();
    getLikedMovies();
}

function trendsPage(){
    console.log('trends')
    headerSection.classList.remove('header-container--long');
    headerSection.style.background = '';
    arrowBtn.classList.remove('inactive');
    arrowBtn.classList.remove('header-arrow--white');
    headerCategoryTitle.classList.remove('inactive');
    headerTitle.classList.add('inactive');
    searchForm.classList.add('inactive');

    trendingPreviewSection.classList.add('inactive');
    likedMoviesSection.classList.add('inactive');
    categoriesPreviewSection.classList.add('inactive');
    genericSection.classList.remove('inactive')
    movieDetailSection.classList.add('inactive')

    getTrendingMovies()
    headerCategoryTitle.textContent = 'Tendencias'

    InfiniteScroll = getPaginatedTrendingMovies;
}
function moviesPage(){

    headerSection.classList.add('header-container--long');
    // headerSection.style.background = '';
    arrowBtn.classList.remove('inactive');
    arrowBtn.classList.add('header-arrow--white');
    headerCategoryTitle.classList.add('inactive');
    headerTitle.classList.add('inactive');
    searchForm.classList.add('inactive');

    trendingPreviewSection.classList.add('inactive');
    categoriesPreviewSection.classList.add('inactive');
    likedMoviesSection.classList.add('inactive');
    genericSection.classList.add('inactive')
    movieDetailSection.classList.remove('inactive')
    console.log('movie');
    
    const [ _, movieId] = location.hash.split('=');
    getMovieById(movieId);
}
function categoriesPage(){
    headerSection.classList.remove('header-container--long');
    headerSection.style.background = '';
    arrowBtn.classList.remove('inactive');
    arrowBtn.classList.remove('header-arrow--white');
    headerCategoryTitle.classList.remove('inactive');
    headerTitle.classList.add('inactive');
    searchForm.classList.add('inactive');

    trendingPreviewSection.classList.add('inactive');
    likedMoviesSection.classList.add('inactive');
    categoriesPreviewSection.classList.add('inactive');
    genericSection.classList.remove('inactive');
    movieDetailSection.classList.add('inactive');

    const [ _, categoryData] = location.hash.split('=');
    const [ idCategory, nameCategory] = categoryData.split('-');
    getMoviesByCategories(idCategory);
    headerCategoryTitle.textContent = nameCategory;
    InfiniteScroll = getPaginatedMoviesByCategories(idCategory);
}
function searchPage(){
    console.log('search')
    headerSection.classList.remove('header-container--long');
    headerSection.style.background = '';
    arrowBtn.classList.remove('inactive');
    arrowBtn.classList.remove('header-arrow--white');
    headerCategoryTitle.classList.add('inactive');
    headerTitle.classList.add('inactive');
    searchForm.classList.remove('inactive');

    trendingPreviewSection.classList.add('inactive');
    likedMoviesSection.classList.add('inactive');
    categoriesPreviewSection.classList.add('inactive');
    genericSection.classList.remove('inactive');
    movieDetailSection.classList.add('inactive');

    const [ _, queryValue] = location.hash.split('=');
    getMoviesBySearch(queryValue);
    InfiniteScroll = getPaginatedMoviesBySearch(queryValue);
}