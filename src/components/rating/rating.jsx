import React from 'react';
import PropTypes from 'prop-types';

export const Rating = ({rating, classes = {}}) => {
  return (
    <div className={`rating ${classes.container || ``}`}>
      <div className={`rating__stars ${classes.stars || ``}`}>
        <span style={{
          width: `${ratingInPercents(rating)}%`
        }}>
        </span>
        <span className="visually-hidden">Rating</span>
      </div>
    </div>
  );
};

const ratingInPercents = (rating, max = 5) => {
  return rating / max * 100;
};

Rating.propTypes = {
  rating: PropTypes.number,
  classes: PropTypes.object
};
