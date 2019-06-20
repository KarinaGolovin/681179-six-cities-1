import React from 'react';
import PropTypes from 'prop-types';

export const SelectForm = (props) => {
  const activeItem = `Top rated first`;
  const isOpened = true;

  return (
    <form className="places__sorting" action="#" method="get">
      <span className="places__sorting-caption">Sort by</span>
      {` `}
      <span className="places__sorting-type" tabIndex="0">
                    Popular
        <svg className="places__sorting-arrow" width="7" height="4">
          <use xlinkHref="#icon-arrow-select" />
        </svg>
      </span>
      <ul className={`places__options places__options--custom ${isOpened ? `places__options--opened` : ``}`}>
        {[`Popular`, `Price: low to high`, `Price: high to low`, `Top rated first`].map((option, i) => {
          return (
            <li
              key={`select-${i}`}
              className={`places__option ${activeItem === option ? `places__option--active` : `` }`}
              tabIndex= {0}
              onClick={() => {}}>
              {option}
            </li>
          );
        })}
      </ul>
      {/*<select className="places__sorting-type" id="places-sorting" onChange={(evt) => {*/}
      {/*  props.onSortTypeChange(evt.target.value);*/}
      {/*}}>*/}
      {/*  <option className="places__option" value="popular" defaultValue="">Popular</option>*/}
      {/*  <option className="places__option" value="to-high">Price: low to high</option>*/}
      {/*  <option className="places__option" value="to-low">Price: high to low</option>*/}
      {/*  <option className="places__option" value="top-rated">Top rated first</option>*/}
      {/*</select>*/}
    </form>
  );
}

SelectForm.propTypes = {
  onSortTypeChange: PropTypes.func,
  // selectOptions: PropTypes.arrayOf(PropTypes.object),
};


