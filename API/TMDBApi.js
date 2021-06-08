const API_KEY = "6e49329bbd9f02d58eb36c6e1e835418";

export function getFilmsFromApiWithSearchedText  (text, page) {
  const url = "https://api.themoviedb.org/3/search/movie?api_key="+
    API_KEY
    +"&language=fr"
    +"&query="+text
    +"&page="+page;
    console.log(url);
    return fetch(url)
      .then((response) => {
        const json = response.json();
        console.log(json);
        return json;
      })
      .catch((error) => {
        console.log('Mon erreur dans getFilmsFromApiWithSearchedText= '+error)
        // return null;
      });
}

// API/TMDBApi.js

export function getImageFromApi (posterPath) {
  if(posterPath) {
    return 'https://image.tmdb.org/t/p/w300' + posterPath;
  }
  else {
    return null;
  }
}
