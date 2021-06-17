const API_KEY = "6e49329bbd9f02d58eb36c6e1e835418";
const LANG = 'fr';

export function getFilmsFromApiWithSearchedText  (text, page) {
  const url = "https://api.themoviedb.org/3/search/movie?"
    +"api_key="+API_KEY
    +"&language="+LANG
    +"&query="+text
    +"&page="+page;
    console.log(url);

    return fetch(url)
      .then((response) => {
        const json = response.json();
        return json;
      })
      .catch((error) => {
        console.log('Mon erreur dans getFilmsFromApiWithSearchedText= '+error)
      });
}

export function getImageFromApi(posterPath, size = 'w300') {
  if(posterPath) {

    return 'https://image.tmdb.org/t/p/' + size + posterPath;
  }
  else {
    return null;
  }
}

export function getFilmDetailFromApi(filmID) {
  const url = "https://api.themoviedb.org/3/movie/"
    +filmID
    +"?api_key="+API_KEY
    +"&language="+LANG;
    console.log(url);

    return fetch(url)
      .then((response) => {
        const json = response.json();
        console.log(json);
        return json;
      })
      .catch((error) => {
        console.log('Mon erreur dans getFilmsFromApiWithSearchedText= '+error)
      });
}
