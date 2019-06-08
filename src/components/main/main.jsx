import React from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {toggleFavorite} from '../../store/actions';
import PlacesList from '../places-list/places-list.jsx';
import CitiesList from '../cities-list/cities-list.jsx';
import Map from '../map/map.jsx';
import {getCityOffers, getCoordinatesByCity, getSelectedCity} from '../../store/reducers';
import withActiveItem from '../../hocs/with-active-item/with-active-item';

const PlacesListWrapped = withActiveItem(PlacesList);

export const Main = (props) => {
  const {coordinatesByCity, currentPlaces, currentCity, updateBookmark} = props;

  return (
    <main className="page__main page__main--index">
      <h1 className="visually-hidden">Cities</h1>
      <div className="cities tabs">
        <section className="locations container">
          <CitiesList
            cities={Object.keys(coordinatesByCity)}
            activeItem={currentCity}
          />
        </section>
      </div>
      <div className="cities__places-wrapper">
        <div className="cities__places-container container">
          <section className="cities__places places">
            <h2 className="visually-hidden">Places</h2>
            {currentCity ? (
              <>
                <b className="places__found">{currentPlaces.length} places to stay in {currentCity}</b>
                <form className="places__sorting" action="#" method="get">
                  <span className="places__sorting-caption">Sort by</span>
                  <span className="places__sorting-type" tabIndex="0">
                    Popular
                    <svg className="places__sorting-arrow" width="7" height="4">
                      <use xlinkHref="#icon-arrow-select" />
                    </svg>
                  </span>
                  {/* <ul className="places__options places__options--custom places__options--opened">
                    <li className="places__option places__option--active" tabIndex="0">Popular</li>
                    <li className="places__option" tabIndex="0">Price: low to high</li>
                    <li className="places__option" tabIndex="0">Price: high to low</li>
                    <li className="places__option" tabIndex="0">Top rated first</li>
                  </ul> */}
                  <select className="places__sorting-type" id="places-sorting">
                    <option className="places__option" value="popular" defaultValue="">Popular</option>
                    <option className="places__option" value="to-high">Price: low to high</option>
                    <option className="places__option" value="to-low">Price: high to low</option>
                    <option className="places__option" value="top-rated">Top rated first</option>
                  </select>
                </form>
              </>
            ) : null}
            <PlacesListWrapped
              offers={currentPlaces}
              onBookmarkClick={updateBookmark}
            />
          </section>
          <div className="cities__right-section">
            {coordinatesByCity[currentCity] ? (
              <Map
                cityCoords={coordinatesByCity[currentCity]}
                placesList={currentPlaces}
              />
            ) : null}
          </div>
        </div>
      </div>
    </main>
  );
};

const mapStateToProps = (state, {selectedCityName}) => {
  const currentCity = getSelectedCity(selectedCityName, state);

  return {
    currentCity,
    currentPlaces: getCityOffers(currentCity, state.offers),
    coordinatesByCity: getCoordinatesByCity(state),
  };
};

const mapDispatchToProps = {
  updateBookmark: toggleFavorite
};

Main.propTypes = {
  mapZoom: PropTypes.number,
  currentCity: PropTypes.string,
  coordinatesByCity: PropTypes.object,
  currentPlaces: PropTypes.arrayOf(PropTypes.object).isRequired,
  updateBookmark: PropTypes.func.isRequired,
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Main);
