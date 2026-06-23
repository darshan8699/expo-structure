import React from 'react';
import renderer from 'react-test-renderer';
import HomeScreen from '../src/app/index';

describe('<HomeScreen />', () => {
  it('renders correctly', async () => {
    let tree;
    await renderer.act(() => {
      tree = renderer.create(<HomeScreen />);
    });
    expect(tree).toBeDefined();
  });
});
