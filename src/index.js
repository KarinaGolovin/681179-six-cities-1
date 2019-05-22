import React from 'react';
import ReactDOM from 'react-dom';
import {Provider} from 'react-redux';
import {createStore} from 'redux';
import rootReducer from './store/reducers';
import App from './components/app/app.jsx';
import offers from './mocks/offers.js';

const init = () => {
  ReactDOM.render(
      <Provider store={createStore(rootReducer, {
        currentCity: ``,
        offers
      })}>
        <App />
      </Provider>,
      document.querySelector(`#root`)
  );
};

init();
