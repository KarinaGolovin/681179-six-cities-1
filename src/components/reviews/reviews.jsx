import React, {Component} from 'react';
import {Rating} from '../rating/rating.jsx';
import ReviewForm from '../review-form/review-form.jsx';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {fetchComments, postComments} from '../../store/actions';
import {getAuthorizationStatus} from '../../store/reducers/user/selectors';
import {formatDate} from '../../utils';

export class Reviews extends Component {
  componentDidMount() {
    this.props.loadComments(this.props.offerId);
  }
  componentDidUpdate(prevProps) {
    if (this.props.offerId !== prevProps.offerId) {
      this.props.loadComments(this.props.offerId);
    }
  }

  render() {
    const {comments = [], isAuthorizationRequired, sendComment} = this.props;

    return <section className="property__reviews reviews">
      <h2 className="reviews__title">Reviews &middot; <span className="reviews__amount">{comments.length}</span></h2>
      <ul className="reviews__list">
        {comments.map((it) => (
          <li className="reviews__item" key={it.id}>
            <div className="reviews__user user">
              <div className="reviews__avatar-wrapper user__avatar-wrapper">
                <img className="reviews__avatar user__avatar" src={it.user.avatar_url} width="54" height="54"
                  alt="Reviews avatar"/>
              </div>
              <span className="reviews__user-name">{it.user.name}</span>
            </div>
            <div className="reviews__info">
              <Rating
                rating={it.rating}
                classes={{
                  container: `reviews__rating`,
                  stars: `reviews__stars`,
                }}
              />
              <p className="reviews__text">{it.comment}</p>
              <time className="reviews__time" dateTime={it.date}>{formatDate(it.date)}</time>
            </div>
          </li>
        ))}
      </ul>
      {!isAuthorizationRequired ? <ReviewForm
        offerId={this.props.offerId}
        onSubmitRating={sendComment}
      /> : null}
    </section>;
  }
}

const getSortedByDate = (reviewList) => {
  if (!reviewList || !reviewList.length) {
    return reviewList;
  }

  const sorted = [...reviewList].sort(function (a, b) {
    return new Date(b.date) - new Date(a.date);
  });

  return sorted.slice(0, 10);
};

Reviews.propTypes = {
  offerId: PropTypes.number,
  comments: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.number,
    ration: PropTypes.number,
    review: PropTypes.string,
    date: PropTypes.string,
    user: PropTypes.shape({
      id: PropTypes.number,
      isPro: PropTypes.bool,
      name: PropTypes.string,
      avatarUrl: PropTypes.string
    })
  })),
  onSubmitRating: PropTypes.func,
  loadComments: PropTypes.func,
  isAuthorizationRequired: PropTypes.bool,
  sendComment: PropTypes.func,
};


const mapStateToProps = (state, {offerId}) => {
  return {
    isAuthorizationRequired: getAuthorizationStatus(state),
    offerId,
    comments: getSortedByDate(state.comments[offerId]),
  };
};


const mapDispatchToProps = {
  loadComments: fetchComments,
  sendComment: postComments,
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Reviews);
