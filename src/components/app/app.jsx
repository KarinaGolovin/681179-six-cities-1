import React, {PureComponent} from 'react';
import HomeScreen from '../home-screen/home-screen.jsx';
import LoginScreen from '../login-screen/login-screen.jsx';
import FavoritesScreen from '../favorites-screen/favorites-screen.jsx';
import {Switch, Route} from 'react-router-dom';
import withAuthRedirect from '../../hocs/with-auth-redirect/with-auth-redirect';

const LoginScreenWithRedirect = withAuthRedirect(LoginScreen);

export default class App extends PureComponent {
  render() {
    return (
      <Switch>
        <Route path="/" exact component={HomeScreen} />
        <Route path="/city/:cityName" component={HomeScreen} />
        <Route path="/login" component={LoginScreenWithRedirect} />
        <Route path="/favorites" component={FavoritesScreen} />
      </Switch>
    );
  }
}


