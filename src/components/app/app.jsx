import React, {PureComponent} from 'react';
import {Switch, Route} from 'react-router-dom';
import HomeScreen from '../home-screen/home-screen.jsx';
import LoginScreen from '../login-screen/login-screen.jsx';
import FavoritesScreen from '../favorites-screen/favorites-screen.jsx';
import NotFoundScreen from '../not-found-screen/not-found-screen.jsx';
import OfferScreen from '../offer-screen/offer-screen.jsx';
import {withRootClassNames} from '../../hocs/with-body-class-name/with-body-class-name';

// CSS rely on root classNames, adding extra wrapper breaks map styles as well
const HomeScreenWithRootClassname = withRootClassNames(HomeScreen, [`page--gray`, `page--main`]);
const LoginScreenWithRootClassname = withRootClassNames(LoginScreen, [`page--gray`, `page--main`]);

export default class App extends PureComponent {
  render() {
    return (
      <Switch>
        <Route path="/" exact component={(props) => <HomeScreenWithRootClassname cityName={props.match.params.cityName}/>} />
        <Route path="/city/:cityName" component={(props) => <HomeScreenWithRootClassname cityName={props.match.params.cityName}/>} />
        <Route path="/login" component={LoginScreenWithRootClassname} />
        <Route path="/favorites" component={FavoritesScreen} />
        <Route path="/offer/:offerId" component={(props) => <OfferScreen offerId={Number(props.match.params.offerId)}/>} />
        <Route component={NotFoundScreen} />
      </Switch>
    );
  }
}


