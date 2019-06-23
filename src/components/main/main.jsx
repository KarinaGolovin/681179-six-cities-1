import React from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {toggleFavorite} from '../../store/actions';
import PlacesList from '../places-list/places-list.jsx';
import CitiesList from '../cities-list/cities-list.jsx';
import Map from '../map/map.jsx';
import {getCityOffers, getCoordinatesByCity, getSelectedCity} from '../../store/reducers/offers/selectors';
import withActiveItem from '../../hocs/with-active-item/with-active-item';
import {withOffersSorting} from '../../hocs/with-offer-sorting/with-offer-sorting';
import SelectForm from '../select-form/select-form.jsx';
import {compose, withProps} from 'recompose';

const PlacesListWrapped = withProps({
  classes: {
    container: `cities__places-list tabs__content`,
  },
  cardProps: {
    classes: {
      container: `cities__place-card`,
      imageWrapper: `cities__image-wrapper`
    }
  }
})(PlacesList);

export const Main = ({
  coordinatesByCity,
  currentPlaces,
  currentCity,
  updateBookmark,
  sortingOptions,
  sortingType,
  onSortTypeChange = () => {},
  onActiveItemChange = () => {},
  activeItem
}) => {
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
                <SelectForm
                  defaultValue={sortingType}
                  options={sortingOptions}
                  onSortTypeChange={onSortTypeChange}
                />
              </>
            ) : null}
            <PlacesListWrapped
              offers={currentPlaces}
              onBookmarkClick={updateBookmark}
              onActiveItemChange={onActiveItemChange}
            />
          </section>
          <div className="cities__right-section">
            {coordinatesByCity[currentCity] ? (
              <Map
                mapClass={`cities__map`}
                cityCoords={coordinatesByCity[currentCity]}
                placesList={currentPlaces}
                activePlaceId={activeItem ? activeItem.id : null}
              />
            ) : null}
          </div>
        </div>
      </div>
    </main>
  );
};

Main.propTypes = {
  mapZoom: PropTypes.number,
  currentCity: PropTypes.string,
  coordinatesByCity: PropTypes.object,
  currentPlaces: PropTypes.arrayOf(PropTypes.object).isRequired,
  updateBookmark: PropTypes.func,
  onSortTypeChange: PropTypes.func,
  onActiveItemChange: PropTypes.func,
  activeItem: PropTypes.object,
  sortingType: PropTypes.string,
  sortingOptions: PropTypes.arrayOf(PropTypes.shape({
    value: PropTypes.string,
    label: PropTypes.string,
  }))
};

const mapStateToProps = (state, {selectedCityName}) => {
  const currentCity = getSelectedCity(state, selectedCityName);

  return {
    currentCity,
    currentPlaces: getCityOffers(state, currentCity),
    coordinatesByCity: getCoordinatesByCity(state),
  };
};

const mapDispatchToProps = {
  updateBookmark: toggleFavorite
};

export default compose(
    connect(
        mapStateToProps,
        mapDispatchToProps
    ),
    withOffersSorting,
    withActiveItem
)(Main);
