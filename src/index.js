import React from 'react';
import ReactDOM from 'react-dom';
import App from './components/app/app.jsx';
import Offers from './mocks/offers.js';

const init = () => {
  ReactDOM.render(
      <App
        offers = {Offers}
      />,
      document.querySelector(`#root`)
  );
};

init();
