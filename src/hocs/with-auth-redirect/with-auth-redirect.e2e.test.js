import React from "react";
import PropTypes from 'prop-types';
import {configure, mount} from "enzyme";
import Adapter from "enzyme-adapter-react-16";
import {withAuthRedirect} from './with-auth-redirect';
import {BrowserRouter as Router} from 'react-router-dom';

configure({adapter: new Adapter()});

const MockComponent = ({}) => <div className={`component`}/>;
MockComponent.propTypes = {
  onActiveItemChange: PropTypes.func
};

const ComponentWrapped = withAuthRedirect({
  notAuthorised: `/`,
})(MockComponent);

it(`Should not render in case is isAuthorizationRequired not defined yet`, () => {
  const component = mount(<ComponentWrapped />);

  expect(component.find(`.component`).length).toEqual(0);
});

it(`Should not render in case is isAuthorizationRequired truthy`, () => {
  const component = mount(<Router><ComponentWrapped isAuthorizationRequired={true} /></Router>);

  expect(component.find(`.component`).length).toEqual(0);
});

it(`Should render in case is isAuthorizationRequired falsy`, () => {
  const component = mount(<ComponentWrapped isAuthorizationRequired={false} />);

  expect(component.find(`.component`).length).toEqual(1);
});
