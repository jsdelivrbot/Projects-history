import {combineReducers} from 'redux';
import {reducer as form} from 'redux-form';
import authReducer from './auth_reducer';
import filmsReducer from './films_reducer';

const rootReducer = combineReducers({
  form,
  auth: authReducer,
  films: filmsReducer
});

export default rootReducer;
