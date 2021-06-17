const initialState = {
    favoritesFilms: []
}

function toogleFavorite(state = initialState, action) {
    let nextState;
    switch (action.type) {
        case 'TOOGLE_FAVORITE':
            const favoriteFilmIndex = state.favoritesFilms.findIndex(item => item.id === action.value.id);
            if (favoriteFilmIndex !== -1) {
                nextState = {
                    ...state,
                    favoritesFilms: state.favoritesFilms.filter((item, currentIndex) => currentIndex !== favoriteFilmIndex),
                }
                console.log('dans toogleFavorite --- Suppression dans Liste des films favoris =' + nextState.favoritesFilms.map(function (film) {
                    return film.original_title;
                }).join(" / "));
            }
            else {
                nextState = {
                    ...state,
                    favoritesFilms: [
                        ...state.favoritesFilms,
                        action.value,
                    ]
                }
                console.log('dans toogleFavorite --- Ajout dans Liste des films favoris =' + nextState.favoritesFilms.map(function (film) {
                    return film.original_title;
                }).join(" / "));
            }
            return nextState || state;

        default:
            return state;
    }
}

export default toogleFavorite;