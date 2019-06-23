import React from 'react';
import renderer from 'react-test-renderer';
import {GalleryBlock} from './gallery-block.jsx';

const mock = [];

it(`GalleryBlock correctly renders`, () => {
  const component = renderer.create(
      <GalleryBlock
        images={mock}
      />
  ).toJSON();

  expect(component).toMatchSnapshot();
});
