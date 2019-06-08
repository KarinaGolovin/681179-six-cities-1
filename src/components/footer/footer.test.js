import React from 'react';
import renderer from 'react-test-renderer';
import {Footer} from './footer.jsx';
import {BrowserRouter as Router} from 'react-router-dom';

it(`Footer correctly renders`, () => {
  const component = renderer.create(
      <Router>
        <Footer />
      </Router>
  ).toJSON();

  expect(component).toMatchSnapshot();
});
