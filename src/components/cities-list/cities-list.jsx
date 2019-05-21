import React from 'react';
import PropTypes from 'prop-types';


const CitiesList = (props) => {
  const {cities, onCityClick} = props;
  return (
    <ul className="locations__list tabs__list">
      {cities.slice(0, 6).map((it, i) => {
        return (
          <li className="locations__item" key={it + i}>
            <a className="locations__item-link tabs__item" href="#" onClick={onCityClick(it)}>
              <span>{it}</span>
            </a>
          </li>
        );
      })}
    </ul>
  );
};

CitiesList.propTypes = {
  cities: PropTypes.array.isRequired,
  onCityClick: PropTypes.func.isRequired
};

export default CitiesList;
