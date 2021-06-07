const API_KEY = "6e49329bbd9f02d58eb36c6e1e835418";

export function getFilmsFromApiWithSearchedText  (text) {
  const url = "https://api.themoviedb.org/3/search/movie?api_key="+
    API_KEY
    +"&language=fr"
    +"&query="+text;
    console.log(url);
    return fetch(url)
      .then((response) => {return response.json()})
      .catch((error) => console.error(error));
}

// API/TMDBApi.js

export function getImageFromApi (posterPath) {
  return 'https://image.tmdb.org/t/p/w300' + posterPath
}
