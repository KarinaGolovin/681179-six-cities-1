import React, {PureComponent} from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import Main from '../main/main.jsx';
import Header from '../header/header.jsx';
import SignIn from '../sign-in/sign-in.jsx';
import {getAutorizationStatus} from '../../store/actions';
// import {} from '../../store/reducers';

export class App extends PureComponent {
  render() {
    return this._showScreen();
  }

  _showScreen() {
    const {} = this.props;

    if (isAuthorizationRequired) {
      return (
        <>
          <Header />
          <SignIn
            // onLogin={() => {запрос пост на сервер}}
            onLogin={{validateLogIn}}
          />
        </>
      );
    }
    return (
      <>
       <Header />
       <Main />
     </>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    isAuthorizationRequired: getAutorizationStatus(state),
  };
};

const mapDispatchToProps = (dispatch) => ({
  validateLogIn: () => {
    dispatch(onLoginRequest());
  }
  // setNewCity: (city) => {
  //   dispatch(changeCity(city));
  // }
});

App.propTypes = {
  // from mapStateToProps
  isAuthorizationRequired: PropTypes.bool,

  // from mapDispatchToProps
  validateLogIn: PropTypes.func,
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(App);

