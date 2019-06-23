import React from 'react';
import PropTypes from 'prop-types';
import Main from '../main/main.jsx';
import PageTemplate from '../page-template/page-template.jsx';

export default function HomeScreen({cityName}) {
  return (
    <PageTemplate>
      <Main selectedCityName={cityName}/>
    </PageTemplate>
  );
}

HomeScreen.propTypes = {
  cityName: PropTypes.string
};


