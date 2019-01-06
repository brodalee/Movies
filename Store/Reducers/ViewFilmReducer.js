const initialState = { viewFilms: [] }

function toggleViewFilms(state = initialState, action){
  let nextState;
  switch (action.type) {
      case 'TOGGLE_VIEW':
        const favoriteFilmIndex = state.viewFilms.findIndex(item => item.id === action.value.id)
        if(favoriteFilmIndex !== -1){
          //Suppression car déjà présent
          nextState = {
            ...state,
            viewFilms: state.viewFilms.filter( (item, index) => index !== favoriteFilmIndex)
          }
        } else {
           // Sinon on ajoute car pas encore présent
           nextState = {
             ...state,
             viewFilms: [...state.viewFilms, action.value]
           }
        }
        return nextState || state
      default:
        return state
  }
}

export default toggleViewFilms
