import React from 'react';
import PropTypes from 'prop-types';
import Main from '../main/main.jsx';
import PageTemplate from '../page-template/page-template.jsx';

export default function HomeScreen(props) {
  return (
    <PageTemplate>
      <Main selectedCityName={props.match.params.cityName}/>
    </PageTemplate>
  );
}

HomeScreen.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.shape({
      cityName: PropTypes.string
    })
  })
};


