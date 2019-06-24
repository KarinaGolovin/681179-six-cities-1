import React from 'react';
import PropTypes from 'prop-types';
import {Link} from 'react-router-dom';

const MAX_CITIES_TO_DISPLAY = 6;

const CitiesList = (props) => {
  const {cities, activeItem} = props;
  return (
    <ul className="locations__list tabs__list">
      {cities.slice(0, MAX_CITIES_TO_DISPLAY).map((cityName) => {
        return (
          <li className="locations__item" key={cityName}>
            <Link to={`/city/${cityName}`} className={`locations__item-link tabs__item ${activeItem === cityName ? `tabs__item--active` : ``}`}>
              <span>{cityName}</span>
            </Link>
          </li>
        );
      })}
    </ul>
  );
};

CitiesList.propTypes = {
  activeItem: PropTypes.string,
  cities: PropTypes.arrayOf(PropTypes.string).isRequired
};

export default CitiesList;
