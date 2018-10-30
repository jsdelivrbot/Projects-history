import { renderAutocompleteItem } from 'utils';
import renderer from 'react-test-renderer';

const { describe, it, expect } = global;

describe('renderAutocompleteItem', () => {
  it('returns jsx', () => {
    const params = [1, 2, 3, 4, 5];
    const header = 'Just a simple header';
    const item = {
      id: 2,
      1: 'first',
      2: 'second',
      3: 'third',
      4: 'fourth',
      5: 'fifth',
    };
    const isHighlighted = true;
    const resultItem = renderer.create(renderAutocompleteItem(params, header)(item, isHighlighted)).toJSON();

    expect(resultItem).toMatchSnapshot();
  });
});
