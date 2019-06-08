import React, {PureComponent} from 'react';
import {compose} from 'recompose';
import {connect} from 'react-redux';
import {getAuthorizationStatus} from '../../store/actions';
import PropTypes from 'prop-types';
import history from '../../history';

const withAuthRedirect = (Component) => {
  class WithAuthRedirect extends PureComponent {
    componentDidMount() {
      if (!this.props.isAuthorizationRequired) {
        this._redirectToHomePage();
      }
    }

    componentDidUpdate(prevProps) {
      const {isAuthorizationRequired} = this.props;

      if (!isAuthorizationRequired && prevProps.isAuthorizationRequired !== isAuthorizationRequired) {
        this._redirectToHomePage();
      }
    }

    _redirectToHomePage() {
      history.push(`/`);
    }

    render() {
      return <Component {...this.props} />;
    }
  }

  WithAuthRedirect.propTypes = {
    isAuthorizationRequired: PropTypes.bool
  };

  return WithAuthRedirect;
};

const mapStateToProps = (state) => {
  return {
    isAuthorizationRequired: getAuthorizationStatus(state),
  };
};

export default compose(
    connect(mapStateToProps),
    withAuthRedirect
);
