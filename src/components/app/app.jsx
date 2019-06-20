import React, {PureComponent} from 'react';
import {Switch, Route} from 'react-router-dom';
import HomeScreen from '../home-screen/home-screen.jsx';
import LoginScreen from '../login-screen/login-screen.jsx';
import FavoritesScreen from '../favorites-screen/favorites-screen.jsx';
import OfferScreen from '../offer-screen/offer-screen.jsx';
import {withRootClassNames} from '../../hocs/with-body-class-name/with-body-class-name';

// I know it's a bit weird but... markup rely on root classNames
// I tried to add extra wrapper divs but guess what map css breaks in this case
const HomeScreenWithRootClassname = withRootClassNames(HomeScreen, [`page--gray`, `page--main`]);

export default class App extends PureComponent {
  render() {
    return (
      <Switch>
        <Route path="/" exact component={HomeScreenWithRootClassname} />
        <Route path="/city/:cityName" component={HomeScreenWithRootClassname} />
        <Route path="/login" component={LoginScreen} />
        <Route path="/favorites" component={FavoritesScreen} />
        <Route path="/offer/:offerId" component={OfferScreen} />
      </Switch>
    );
  }
}


