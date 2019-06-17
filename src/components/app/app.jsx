import React, {PureComponent} from 'react';
import {Switch, Route} from 'react-router-dom';
import HomeScreen from '../home-screen/home-screen.jsx';
import LoginScreen from '../login-screen/login-screen.jsx';
import FavoritesScreen from '../favorites-screen/favorites-screen.jsx';
import OfferScreen from '../offer-screen/offer-screen.jsx';


export default class App extends PureComponent {
  render() {
    return (
      <Switch>
        <Route path="/" exact component={HomeScreen} />
        <Route path="/city/:cityName" component={HomeScreen} />
        <Route path="/login" component={LoginScreen} />
        <Route path="/favorites" component={FavoritesScreen} />
        <Route path="/offer/:offerId" component={OfferScreen} />
      </Switch>
    );
  }
}


