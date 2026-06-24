import React from 'react';
import ReactTestRenderer from 'react-test-renderer';
import Button from './button';

test('Button renders correctly', async () => {
  let component: any;
  await ReactTestRenderer.act(async () => {
    component = ReactTestRenderer.create(
      <Button label="Click me" onPress={() => {}} />
    );
  });
  expect(component.toJSON()).toBeTruthy();
});
