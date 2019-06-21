import React, {PureComponent, Fragment} from 'react';
import PropTypes from 'prop-types';

const FormReviewParams = {
  MIN_LENGTH: 50,
  MAX_LENGTH: 300,
};

const formValidators = {
  review: (value) => value.length >= FormReviewParams.MIN_LENGTH && value.length <= FormReviewParams.MAX_LENGTH,
  rating: (value) => value > 0
};

export class ReviewForm extends PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      rating: null,
      review: ``,
      isValid: false
    };

    this._handleFormSubmit = this._handleFormSubmit.bind(this);
    this._handleFormChange = this._handleFormChange.bind(this);
  }

  componentDidUpdate() {
    this._validateForm();
  }

  _validateForm() {
    const isValid = Object.keys(formValidators).every((name) => {
      if (!formValidators[name]) {
        return true;
      }

      return formValidators[name](this.state[name]);
    });

    if (this.state.isValid !== isValid) {
      this.setState({
        isValid
      });
    }
  }

  _handleFormSubmit(evt) {
    this.props.onSubmitRating({
      offerId: this.props.offerId,
      rating: this.state.rating,
      review: this.state.review,
    });

    this._resetForm(evt);
  }

  _handleFormChange(evt) {
    this.setState({
      [evt.target.name]: evt.target.value
    });
  }

  _resetForm() {
    this.myFormRef.reset();
    this.setState({
      rating: ``,
      review: ``,
      isValid: false
    });
  }

  render() {
    return (
      <form className="reviews__form form" action="#" method="post" ref={(el) => this.myFormRef = el} onChange={this._handleFormChange} onSubmit={(evt) => {
        evt.preventDefault();
        this._handleFormSubmit(evt);
      }}
      >
        <label className="reviews__label form__label" htmlFor="review">Your review</label>
        <div className="reviews__rating-form form__rating">
          {
            [`perfect`, `good`, `not bad`, `badly`, `terribly`].map((title, index, arr) => {
              const star = arr.length - index;
              return (
                <Fragment key={star}>
                  <input className="form__rating-input visually-hidden" name="rating" value={star} id={`${star}-stars`} type="radio" />
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
        <textarea className="reviews__textarea form__textarea" id="review" name="review" placeholder="Tell how was your stay, what you like and what can be improved" minLength={FormReviewParams.MIN_LENGTH} maxLength={FormReviewParams.MAX_LENGTH} required/>
        <div className="reviews__button-wrapper">
          <p className="reviews__help">
            To submit review please make sure to set
            <span className="reviews__star">rating</span>
            and describe your stay with at least
            {` `}
            <b className="reviews__text-amount">{FormReviewParams.MIN_LENGTH} characters</b>.
          </p>
          <button className="reviews__submit form__submit button" type="submit" disabled={!this.state.isValid}>Submit</button>
        </div>
      </form>
    );
  }
}

ReviewForm.propTypes = {
  offerId: PropTypes.number,
  onSubmitRating: PropTypes.func,
};
