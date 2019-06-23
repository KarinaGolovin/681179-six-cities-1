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
  rating: (props, propName, componentName) => {
    const MIN = 0;
    const MAX = 5;
    if (props[propName] < MIN || props[propName] > MAX) {
      return new Error(`Invalid property value ${propName} in component ${componentName}. Must be in interval from ${MIN} to ${MAX}`);
    }
    return null;
  },
  classes: PropTypes.shape({
    stars: PropTypes.string,
    container: PropTypes.string
  }),
  value: PropTypes.bool
};
