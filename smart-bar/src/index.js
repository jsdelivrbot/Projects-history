import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import { Router, Route, IndexRoute, browserHistory } from 'react-router';
import reduxThunk from 'redux-thunk';
import promise from 'redux-promise';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';

import App from './components/App/app';
import Grammarly from './components/Grammarly/Grammarly';
import Apps from './components/Apps/Apps';
import Premium from './components/Premium/Premium';
import Profile from './components/Profile/Profile';
import Login from './containers/Login/Login';
import SignUp from './containers/SignUp/SignUp';
import reducers from './reducers';

const createStoreWithMiddleware = applyMiddleware(promise, reduxThunk)(createStore);
const store = createStoreWithMiddleware(reducers);

const requireAuth = (nextState, replaceState) => {
  const isLoggedIn = localStorage.getItem('isLoggedIn');
  if (!isLoggedIn) {
    replaceState({ nextPathname: nextState.location.pathname }, '/login');
  }
};

ReactDOM.render(
  <Provider store={store}>
    <MuiThemeProvider >
      <Router history={browserHistory} >
        <Route path="login" component={Login} />
        <Route path="signup" component={SignUp} />
        <Route path="/" component={App} onEnter={requireAuth}>
          <Route path="grammarly" component={Grammarly} />
          <Route path="profile" component={Profile} />
          <Route path="apps" component={Apps} />
          <Route path="premium" component={Premium} />
        </Route>
      </Router>
    </MuiThemeProvider>
  </Provider>
  , document.querySelector('.container1'));

