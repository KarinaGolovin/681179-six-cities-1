import React from 'react';
import PropTypes from 'prop-types';
import {ratingInPercents} from '../../utils';

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

Rating.propTypes = {
  rating: PropTypes.oneOf([0, 1, 2, 3, 4, 5]),
  classes: PropTypes.shape({
    stars: PropTypes.string,
    container: PropTypes.string
  }),
  value: PropTypes.bool
};
