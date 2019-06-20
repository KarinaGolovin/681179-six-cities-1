import React from 'react';
import PropTypes from 'prop-types';

export const Rating = ({rating = 0, classes = {}}) => {
  return (
    <div className={`rating ${classes.container || ``}`}>
      <div className={`rating__stars ${classes.stars || ``}`}>
        <span style={{
          width: `${ratingInPercents(rating)}%`
        }}>
        </span>
        <span className="visually-hidden">Rating</span>
      </div>
      {(classes.value ? <span className={`rating__value ${classes.value}`}>{rating}</span> : null)}
    </div>
  );
};

const ratingInPercents = (rating, max = 5) => {
  return Math.round(rating) / max * 100;
};

Rating.propTypes = {
  rating: PropTypes.number,
  classes: PropTypes.object,
  value: PropTypes.bool
};
