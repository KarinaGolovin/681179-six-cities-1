import React from 'react';
import PropTypes from 'prop-types';
import Main from '../main/main.jsx';

const App = (props) => {
  const {offers, settings} = props;

  return <Main
    offers = {offers}
    settings = {settings}
  />;
};

App.propTypes = {
  offers: PropTypes.object.isRequired,
  settings: PropTypes.isRequired,
};

export default App;

