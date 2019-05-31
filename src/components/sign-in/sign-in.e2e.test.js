import React from 'react';
import { configure, mount} from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import SignIn from './sign-in.jsx';

configure({adapter: new Adapter()});


it(`Check if PreventDefault works correctly on SignIn submit`, () => {
  const onLogin = jest.fn();
  const component = mount(<SignIn
    onLogin={onLogin}
  />);

  const formSendPrevention = jest.fn();

  component.find(`form`).simulate(`submit`, {
    preventDefault: formSendPrevention,
  });

  expect(onLogin).toHaveBeenCalledTimes(1);
  expect(formSendPrevention).toHaveBeenCalledTimes(1);
});
