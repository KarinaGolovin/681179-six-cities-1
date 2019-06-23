import React from 'react';
import renderer from 'react-test-renderer';
import {UserInfoBlock} from './user-info-block.jsx';

const mock = {
  avatar: ``,
  email: ``,
};

it(`UserInfoBlock correctly renders`, () => {
  const component = renderer.create(
      <UserInfoBlock
        avatar={mock.avatar}
        email={mock.email}
      />
  ).toJSON();

  expect(component).toMatchSnapshot();
});
