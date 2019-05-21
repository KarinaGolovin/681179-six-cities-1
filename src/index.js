import React from 'react';
import ReactDOM from 'react-dom';
import {Provider} from 'react-redux';
import {createStore} from 'redux';
import rootReducer from './store/reducers';
import App from './components/app/app.jsx';
import Offers from './mocks/offers.js';

const init = () => {
  ReactDOM.render(
      <Provider store={createStore(rootReducer)}>
        <App
          offers={Offers}
        />
      </Provider>,
      document.querySelector(`#root`)
  );
};

init();
