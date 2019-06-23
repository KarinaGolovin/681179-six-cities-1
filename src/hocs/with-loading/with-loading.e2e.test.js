import React from "react";
import PropTypes from 'prop-types';
import {configure, mount} from "enzyme";
import Adapter from "enzyme-adapter-react-16";
import withLoading from './with-loading';

configure({adapter: new Adapter()});

const MockComponent = ({}) => <div className={`component`}/>;
MockComponent.propTypes = {
  onActiveItemChange: PropTypes.func
};

const ComponentWrapped = withLoading(MockComponent);

it(`Should not render component in case of loading`, () => {
  const component = mount(<ComponentWrapped isLoading={true} />);

  expect(component.find(`.component`).length).toEqual(0);
});

it(`Should render component in case of not loading`, () => {
  const component = mount(<ComponentWrapped isLoading={false} />);

  expect(component.find(`.component`).length).toEqual(1);
});
