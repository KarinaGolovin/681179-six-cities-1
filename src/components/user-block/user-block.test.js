import React from 'react';
import renderer from 'react-test-renderer';
import {UserBlock} from './user-block.jsx';

const mock = {
  name: `Test`,
  avatar: ``,
  status: false,
};

it(`UserBlock correctly renders`, () => {
  const component = renderer.create(
      <UserBlock
        userName={mock.name}
        userAvatar={mock.avatar}
        userStatus={mock.status}
      />
  ).toJSON();

  expect(component).toMatchSnapshot();
});
