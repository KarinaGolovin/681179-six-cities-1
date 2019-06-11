import React from 'react';
import PropTypes from 'prop-types';

const withLoading = (Component) => {
  function WithLoading({isLoading, ...props}) {
    if (!isLoading) {
      return (<Component {...props} />);

    }

    return (<p>Be Hold, fetching data may take some time</p>);
  }
  return WithLoading;
};

withLoading.propTypes = {
  isLoading: PropTypes.bool
};


export default withLoading;
