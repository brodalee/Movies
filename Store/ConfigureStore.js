import {createStore, combineReducers } from 'redux'
import toggleFavorite from './Reducers/FavoriteReducer'
import toggleViewFilms from './Reducers/ViewFilmReducer'
import { persistCombineReducers } from 'redux-persist'
import storage from 'redux-persist/lib/storage'


const reducers = combineReducers({
    favoritesFilm: toggleFavorite,
    viewFilms: toggleViewFilms
});

const rootPersistConfig = {
  key: 'root',
  storage: storage
};

export default createStore(persistCombineReducers(rootPersistConfig, {
  favoritesFilm: toggleFavorite,
  viewFilms: toggleViewFilms
}));
