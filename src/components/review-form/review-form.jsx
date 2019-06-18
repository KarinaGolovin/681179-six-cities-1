import React, {Component} from 'react';
import PropTypes from 'prop-types';

export class ReviewForm extends Component {
  constructor(props) {
    super(props);

    this.state = {
      rating: null,
      comment: null,
      valid: false
    };

    this.handleInputStarChange = this.handleInputStarChange.bind(this);
    this.handleCommentChange = this.handleCommentChange.bind(this);
    this.handleValidity = this.handleValidity.bind(this);
    this.handleFormSubmit = this.handleFormSubmit.bind(this);
  }

  componentDidMount() {

  }
  componentDidUpdate(prevProps) {
    if (this.props !== prevProps) {
      this.handleValidity();
    }
  }
  componentWillUnmount() {

  }

  handleInputStarChange({target: {value}}) {
    this.setState({
      ...this.state,
      rating: value
    });
    console.log(value);
  }

  handleCommentChange({target: {value}}) {
    this.setState({
      ...this.state,
      comment: value,
    });
    console.log(value);
  }

  handleValidity() {
    console.log(this.state.valid);

    // if (this.state.rating && (this.state.comment.length >= 50 && this.state.comment.length < 300)) {
    //   this.setState({
    //     ...this.state,
    //     valid: true,
    //   });
    // }
  }

  handleFormSubmit() {
    this.props.onSubmitRating({
      offerId: this.props.offerId,
      rating: this.state.rating,
      comment: this.state.comment,
    });

    this.setState({
      rating: ``,
      comment: ``,
      valid: false
    });
  }

  render() {
    const formParams = {
      minLength: 50,
      maxLength: 300,
    };

    return (
      <form className="reviews__form form" action="#" method="post" onSubmit={(evt) => {
        evt.preventDefault();
        this.handleFormSubmit();
      }}
      >
        <label className="reviews__label form__label" htmlFor="review">Your review</label>
        <div className="reviews__rating-form form__rating">
          <input onChange={this.handleInputStarChange} className="form__rating-input visually-hidden" name="rating" value="5" id="5-stars" type="radio" />
          <label htmlFor="5-stars" className="reviews__rating-label form__rating-label" title="perfect">
            <svg className="form__star-image" width="37" height="33">
              <use xlinkHref="#icon-star"/>
            </svg>
          </label>
          <input onChange={this.handleInputStarChange} className="form__rating-input visually-hidden" name="rating" value="4" id="4-stars" type="radio" />
          <label htmlFor="4-stars" className="reviews__rating-label form__rating-label" title="good">
            <svg className="form__star-image" width="37" height="33">
              <use xlinkHref="#icon-star"/>
            </svg>
          </label>
          <input onChange={this.handleInputStarChange} className="form__rating-input visually-hidden" name="rating" value="3" id="3-stars" type="radio" />
          <label htmlFor="3-stars" className="reviews__rating-label form__rating-label" title="not bad">
            <svg className="form__star-image" width="37" height="33">
              <use xlinkHref="#icon-star"/>
            </svg>
          </label>
          <input onChange={this.handleInputStarChange} className="form__rating-input visually-hidden" name="rating" value="2" id="2-stars" type="radio" />
          <label htmlFor="2-stars" className="reviews__rating-label form__rating-label" title="badly">
            <svg className="form__star-image" width="37" height="33">
              <use xlinkHref="#icon-star"/>
            </svg>
          </label>
          <input onChange={this.handleInputStarChange} className="form__rating-input visually-hidden" name="rating" value="1" id="1-star" type="radio" />
          <label htmlFor="1-star" className="reviews__rating-label form__rating-label" title="terribly">
            <svg className="form__star-image" width="37" height="33">
              <use xlinkHref="#icon-star"/>
            </svg>
          </label>
        </div>
        <textarea onChange={this.handleCommentChange} className="reviews__textarea form__textarea" id="review" name="review" placeholder="Tell how was your stay, what you like and what can be improved" minLength={formParams.minLength} maxLength={formParams.maxLength} required/>
        <div className="reviews__button-wrapper">
          <p className="reviews__help">
            To submit review please make sure to set
            <span className="reviews__star">rating</span>
            and describe your stay with at least
            {' '}
            <b className="reviews__text-amount">{formParams.minLength} characters</b>.
          </p>
          <button className="reviews__submit form__submit button" type="submit" disabled={!this.state.valid ? `disabled` : null}>Submit</button>
        </div>
      </form>
    );
  }
}

ReviewForm.propTypes = {
  offerId: PropTypes.number,
  onSubmitRating: PropTypes.func,
};
