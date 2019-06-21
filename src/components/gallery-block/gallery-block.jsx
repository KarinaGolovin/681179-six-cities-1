import React from 'react';
import PropTypes from 'prop-types';

export const GalleryBlock = ({images}) => {
  return (
    <div className="property__gallery-container container">
      <div className="property__gallery">
        {images.map((image) => {
          return (
            <div className="property__image-wrapper" key={image}>
              <img className="property__image" src={image} alt="Photo studio"/>
            </div>
          );
        })}
      </div>
    </div>
  );
};

GalleryBlock.propTypes = {
  images: PropTypes.arrayOf(PropTypes.string)
}
