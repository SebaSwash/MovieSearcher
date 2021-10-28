const apiKey = '9b1c7711acb80c698544c03b682694ff';

const getMovies = async (filterOptions) => {
    filterOptions['api_key'] = apiKey;
    let queryParams = new URLSearchParams(filterOptions).toString();

    let response = await fetch('https://api.themoviedb.org/3/search/movie?' + queryParams, {
        method: 'GET'
    });

    return response;
}

export {
    getMovies
}