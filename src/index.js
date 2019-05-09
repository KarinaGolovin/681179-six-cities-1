import React from 'react';
import ReactDOM from 'react-dom';
import App from './components/app/app.jsx';
import Offers from './mocks/offers.js';
import Settings from './mocks/settings.js';

const init = () => {
  ReactDOM.render(
      <App
        offers = {Offers}
        settings = {Settings}
      />,
      document.querySelector(`#root`)
  );
};

init();
