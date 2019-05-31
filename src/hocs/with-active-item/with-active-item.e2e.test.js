import React from "react";
import PropTypes from 'prop-types';
import {configure, mount} from "enzyme";
import Adapter from "enzyme-adapter-react-16";
import withActiveItem from "./with-active-item";

configure({adapter: new Adapter()});

const mockItem = {
  title: `Test test`,
  type: `Test`,
  price: 0,
  previewImage: ``,
  link: ``,
  rating: 0,
  isPremium: true,
  id: `001 Test`
};
const MockComponent = ({onActiveItemChange}) => <div>
  <button className="click-me" onClick={() => {
    onActiveItemChange(mockItem);
  }}>Click Me</button>
</div>;
MockComponent.propTypes = {
  onActiveItemChange: PropTypes.func
};

const ComponentWrapped = withActiveItem(MockComponent);

it(`Should write active item in state`, () => {
  const component = mount(<ComponentWrapped />);

  component.find(`.click-me`).simulate(`click`);

  expect(component.state().activeItem).toEqual(mockItem);
});
