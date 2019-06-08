import React from 'react';
import ReactDOM from 'react-dom';
import {Provider} from 'react-redux';
import {createStore, applyMiddleware, compose} from 'redux';
import thunk from 'redux-thunk';
import {configureAPI} from './api';
import rootReducer from './store/reducers';
import {getOfferList, checkLogin} from './store/actions';
import App from './components/app/app.jsx';
import {Router, Switch, Route} from "react-router-dom";
import LoginScreen from './components/login-screen/login-screen.jsx';
import history from './history';

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const init = () => {
  const api = configureAPI();
  const store = createStore(rootReducer, composeEnhancers(
      applyMiddleware(thunk.withExtraArgument(api))
  ));

  store.dispatch(getOfferList());
  store.dispatch(checkLogin());

  ReactDOM.render(
      <Provider store={store}>
        <Router history={history}>
          <Switch>
            <Route path="/" exact component={App} />
            <Route path="/login" component={LoginScreen} />
          </Switch>
        </Router>
      </Provider>,
      document.querySelector(`#root`)
  );
};

init();
