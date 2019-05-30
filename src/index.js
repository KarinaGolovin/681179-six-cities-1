import React from 'react';
import ReactDOM from 'react-dom';
import {Provider} from 'react-redux';
import {createStore, applyMiddleware} from 'redux';
import thunk from 'redux-thunk';
import {compose} from 'recompose';
import {configureAPI} from './api';
import rootReducer from './store/reducers';
import {getOfferList} from './store/actions';
import App from './components/app/app.jsx';

const init = () => {
  const api = configureAPI((...args) => store.dispatch(...args));
  const store = createStore(
      rootReducer,
      {currentCity: null},
      compose(
          applyMiddleware(thunk.withExtraArgument(api)),
          window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
      )
  );

  // Список предложений должен загружаться сразу при старте приложения.
  store.dispatch(getOfferList());

  ReactDOM.render(
      <Provider store={store}>
        <App />
      </Provider>,
      document.querySelector(`#root`)
  );
};

init();
