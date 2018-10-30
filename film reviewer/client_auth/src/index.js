import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import {
  Router,
  Route,
  IndexRoute,
  browserHistory
} from 'react-router';
import reduxThunk from 'redux-thunk';
import promise from 'redux-promise';

import App from './components/app';
import Signin from './components/auth/signin';
import Signup from './components/auth/signup';
import RequireAuth from './components/auth/require_auth';
import Welcome from './components/welcome';
import { AUTH_USER } from './actions/types';
import FilmList from './components/films/film_list';
import FilmNew from './components/films/film_new';
import FilmDetail from './components/films/film_detail';
import reducers from './reducers';

const createStoreWithMiddleware = applyMiddleware(promise, reduxThunk)(createStore);
const store = createStoreWithMiddleware(reducers);

const token = localStorage.getItem('token');
if (token) {
  store.dispatch({ type: AUTH_USER });
}

ReactDOM.render(
  <Provider store={ store }>
    <Router history={ browserHistory }>
      <Route path="/" component={ App} >
        <IndexRoute component={ Welcome }/>
        <Route path="signin" component={ Signin }/>
        <Route path="signup" component={ Signup }/>
        <Route path="films/new" component={ RequireAuth(FilmNew) }/>
        <Route path="films/:id" component={ RequireAuth(FilmDetail) }/>
        <Route path="/films" component={ RequireAuth(FilmList) }/>
      </Route>
    </Router>
  </Provider>, document.querySelector('.container'));
