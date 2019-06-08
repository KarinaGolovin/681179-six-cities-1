import React, {PureComponent} from 'react';
import HomeScreen from '../home-screen/home-screen.jsx';
import LoginScreen from '../login-screen/login-screen.jsx';
import FavoritesScreen from '../favorites-screen/favorites-screen.jsx';
import {Switch, Route} from 'react-router-dom';

export default class App extends PureComponent {
  render() {
    return (
      <Switch>
        <Route path="/" exact component={HomeScreen} />
        <Route path="/login" component={LoginScreen} />
        <Route path="/favorites" component={FavoritesScreen} />
      </Switch>
    );
  }
}


