import React from 'react';
import renderer from 'react-test-renderer';
import { HintRow } from '../src/components/hint-row';

describe('<HintRow />', () => {
  it('renders correctly with default props', async () => {
    let tree;
    await renderer.act(() => {
      tree = renderer.create(<HintRow />);
    });
    expect(tree).toBeDefined();
  });

  it('renders custom title and hint', async () => {
    let tree;
    await renderer.act(() => {
      tree = renderer.create(<HintRow title="Custom Title" hint="custom/path.tsx" />);
    });
    expect(tree).toBeDefined();
  });
});
