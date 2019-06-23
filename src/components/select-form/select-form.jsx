import React from 'react';
import PropTypes from 'prop-types';
import {compose, withState, withHandlers} from 'recompose';

export const SelectForm = ({
  value,
  open,
  options = [],
  toggleOpen,
  handleSelectChange
}) => {
  const selectedOption = options.find((it) => it.value === value);

  return (
    <form className="places__sorting" action="#" method="get">
      <span className="places__sorting-caption">Sort by</span>
      {` `}
      <span className="places__sorting-type" tabIndex="0" onClick={toggleOpen}>
        {selectedOption ? selectedOption.label : ``}
        <svg className="places__sorting-arrow" width="7" height="4">
          <use xlinkHref="#icon-arrow-select" />
        </svg>
      </span>
      <ul className={`places__options places__options--custom ${open ? `places__options--opened` : ``}`}>
        {options.map((option) => {
          return (
            <li
              key={option.value}
              className={`places__option ${value === option ? `places__option--active` : `` }`}
              tabIndex= {0}
              value={option.value}
              onClick={() => {
                handleSelectChange(option.value);
              }}>
              {option.label}
            </li>
          );
        })}
      </ul>
      <select className="places__sorting-type visually-hidden" id="places-sorting" onChange={(evt) => {
        handleSelectChange(evt.target.value);
      }} value={value}>
        {options.map((it) => (
          <option className="places__option" value={it.value} key={it.value}>{it.label}</option>
        ))}
      </select>
    </form>
  );
};

SelectForm.propTypes = {
  onSortTypeChange: PropTypes.func.isRequired,
  setOpen: PropTypes.func.isRequired,
  setValue: PropTypes.func.isRequired,
  toggleOpen: PropTypes.func.isRequired,
  handleSelectChange: PropTypes.func.isRequired,
  value: PropTypes.string,
  open: PropTypes.bool,
  defaultValue: PropTypes.string,
  options: PropTypes.arrayOf(PropTypes.shape({
    value: PropTypes.string,
    label: PropTypes.string,
  }))
};


export default compose(
    withState(`open`, `setOpen`, false),
    withState(`value`, `setValue`, (props) => props.defaultValue),
    withHandlers({
      toggleOpen: (props) => () => props.setOpen(!props.open),
      handleSelectChange: (props) => (selectedValue) => {
        props.setValue(selectedValue);
        props.onSortTypeChange(selectedValue);
        props.setOpen(false);
      }
    })
)(SelectForm);

