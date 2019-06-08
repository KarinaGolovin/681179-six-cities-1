import React, {PureComponent} from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {Header} from '../header/header.jsx';
import {getAuthorizationStatus} from '../../store/actions';
import {Footer} from '../footer/footer.jsx';

export class PageTemplate extends PureComponent {
  render() {
    const {children, isAuthorizationRequired, user} = this.props;
    return (
      <>
        <Header
          isAuthorizationRequired={isAuthorizationRequired}
          user={user}
        />
        {children}
        <Footer />
      </>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    isAuthorizationRequired: getAuthorizationStatus(state),
    user: {
      id: state.user.id,
      email: state.user.email,
      name: state.user.name,
      avatar: state.user.avatar_url,
      isPro: state.user.is_pro
    }
  };
};

PageTemplate.propTypes = {
  user: PropTypes.shape({
    id: PropTypes.number,
    email: PropTypes.string,
    name: PropTypes.string,
    avatar: PropTypes.string,
    isPro: PropTypes.bool
  }),
  isAuthorizationRequired: PropTypes.bool,
  children: PropTypes.any
};

export default connect(
    mapStateToProps
)(PageTemplate);

