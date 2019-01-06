const initialState = { favoritesFilm: [] }

function toggleFavorite(state = initialState, action){
  let nextState;
  switch (action.type) {
      case 'TOGGLE_FAVORITE':
        const favoriteFilmIndex = state.favoritesFilm.findIndex(item => item.id === action.value.id)
        if(favoriteFilmIndex !== -1){
          //Suppression car déjà présent
          nextState = {
            ...state,
            favoritesFilm: state.favoritesFilm.filter( (item, index) => index !== favoriteFilmIndex)
          }
        } else {
           // Sinon on ajoute car pas encore présent
           nextState = {
             ...state,
             favoritesFilm: [...state.favoritesFilm, action.value]
           }
        }
        return nextState || state
      default:
        return state
  }
}

export default toggleFavorite
