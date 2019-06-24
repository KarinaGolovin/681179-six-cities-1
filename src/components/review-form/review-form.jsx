import React, {Fragment} from 'react';
import PropTypes from 'prop-types';
import {withFormValidation} from '../../hocs/with-form-validation/with-form-validation';
import {
  compose,
  withHandlers,
  withState,
  lifecycle
} from 'recompose';

const MIN_LENGTH = 50;
const MAX_LENGTH = 300;

export const ReviewForm = ({
  isValid,
  onFormChange,
  onFormSubmit,
  rules = {
    minLength: MIN_LENGTH,
    maxLength: MAX_LENGTH,
  },
  isDisabled = false,
  form
}) => {
  return (
    <form className="reviews__form form" action="#" method="post" onSubmit={onFormSubmit}>
      <label className="reviews__label form__label" htmlFor="review">Your review</label>
      <div className="reviews__rating-form form__rating">
        {
          [`perfect`, `good`, `not bad`, `badly`, `terribly`].map((title, index, arr) => {
            const star = arr.length - index;
            return (
              <Fragment key={star}>
                <input
                  onChange={onFormChange}
                  className="form__rating-input visually-hidden"
                  name="rating"
                  value={star}
                  id={`${star}-stars`}
                  type="radio"
                  checked={star === form.rating}
                />
                <label htmlFor={`${star}-stars`} className="reviews__rating-label form__rating-label" title={title}>
                  <svg className="form__star-image" width="37" height="33">
                    <use xlinkHref="#icon-star"/>
                  </svg>
                </label>
              </Fragment>
            );
          })
        }
      </div>
      <textarea
        onChange={onFormChange}
        className="reviews__textarea form__textarea"
        id="review"
        name="review"
        placeholder="Tell how was your stay, what you like and what can be improved"
        minLength={rules.minLength}
        maxLength={rules.maxLength}
        value={form.review}
        required
      />
      <div className="reviews__button-wrapper">
        <p className="reviews__help">
          To submit review please make sure to set
          <span className="reviews__star">rating</span>
          and describe your stay with at least
          {` `}
          <b className="reviews__text-amount">{rules.minLength} characters</b>.
        </p>
        <button className="reviews__submit form__submit button" type="submit" disabled={isDisabled || !isValid}>Submit</button>
      </div>
    </form>
  );
};

export default compose(
    withState(`form`, `setForm`, {
      rating: null,
      review: ``,
    }),
    withHandlers({
      resetForm: (props) => () => {
        props.setForm({
          rating: null,
          review: ``,
        });
      },
    }),
    withFormValidation({
      review: (value, rules) => value.length >= rules.minLength && value.length <= rules.maxLength,
      rating: (value) => value > 0
    }, {
      minLength: MIN_LENGTH,
      maxLength: MAX_LENGTH,
    }),
    withHandlers({
      onFormChange: (props) => (evt) => {
        const fieldName = evt.target.name;
        const value = evt.target.value;
        const valueConverters = {
          rating: Number
        };

        props.setForm({
          ...props.form,
          [fieldName]: valueConverters[fieldName] ? valueConverters[fieldName](value) : value
        });
      },
      onFormSubmit: (props) => (evt) => {
        evt.preventDefault();
        props.onSubmitRating({
          offerId: props.offerId,
          rating: props.form.rating,
          review: props.form.review,
        });
        props.resetForm();
      }
    }),
    lifecycle({
      componentDidUpdate(prevProps) {
        if (this.props.offerId !== prevProps.offerId) {
          this.props.resetForm();
        }
        this.props.validateForm({
          rating: this.props.form.rating,
          review: this.props.form.review,
        });
      }
    }),
)(ReviewForm);

ReviewForm.propTypes = {
  onFormChange: PropTypes.func.isRequired,
  onFormSubmit: PropTypes.func.isRequired,
  isValid: PropTypes.bool.isRequired,
  rules: PropTypes.shape({
    minLength: PropTypes.number,
    maxLength: PropTypes.number,
  }),
  isDisabled: PropTypes.bool,
  form: PropTypes.shape({
    review: PropTypes.string,
    rating: PropTypes.oneOf([1, 2, 3, 4, 5])
  })
};
