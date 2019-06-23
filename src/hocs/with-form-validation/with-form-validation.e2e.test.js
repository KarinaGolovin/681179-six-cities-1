import React, {Component} from "react";
import PropTypes from 'prop-types';
import {configure, mount} from "enzyme";
import Adapter from "enzyme-adapter-react-16";
import {withFormValidation} from './with-form-validation';

configure({adapter: new Adapter()});

class MockComponent extends Component {
  componentDidMount() {
    this.props.validateForm(this.props.form);
  }

  render() {
    const {isValid} = this.props;
    return <>
      {isValid && <div className={`valid`}/>}
    </>;
  }
}

MockComponent.propTypes = {
  isValid: PropTypes.bool,
  validateForm: PropTypes.func,
  form: PropTypes.object
};

it(`Should be validated as valid in case if all validators return true`, () => {
  const ComponentWrapped = withFormValidation({
    field1: () => true,
    field2: () => true
  }, {})(MockComponent);

  const component = mount(<ComponentWrapped form={{
    field1: ``,
    field2: ``,
  }}/>);

  expect(component.find(`.valid`).length).toEqual(1);
});

it(`Should be validated as invalid in case if validators return false`, () => {
  const ComponentWrapped = withFormValidation({
    field1: () => false,
    field2: () => false
  }, {})(MockComponent);

  const component = mount(<ComponentWrapped form={{
    field1: ``,
    field2: ``,
  }}/>);

  expect(component.find(`.valid`).length).toEqual(0);
});

it(`Should be validated as invalid in case if one of validators return false`, () => {
  const ComponentWrapped = withFormValidation({
    field1: () => false,
    field2: () => true
  }, {})(MockComponent);

  const component = mount(<ComponentWrapped form={{
    field1: ``,
    field2: ``,
  }}/>);

  expect(component.find(`.valid`).length).toEqual(0);
});


it(`Should be validated as invalid in case if validators return falsy`, () => {
  const ComponentWrapped = withFormValidation({
    field1: (value) => value === `valid`,
    field2: (value) => value === `valid`,
  }, {})(MockComponent);

  const component = mount(<ComponentWrapped form={{
    field1: `invalid`,
    field2: `invalid`,
  }}/>);

  expect(component.find(`.valid`).length).toEqual(0);
});

it(`Should be validated as valid in case if validators are truthy`, () => {
  const ComponentWrapped = withFormValidation({
    field1: (value) => value === `valid`,
    field2: (value) => value === `valid`,
  }, {})(MockComponent);

  const component = mount(<ComponentWrapped form={{
    field1: `valid`,
    field2: `valid`,
  }}/>);

  expect(component.find(`.valid`).length).toEqual(1);
});
