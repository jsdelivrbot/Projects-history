import React from 'react';
import { Cell } from 'components/Common/DynamicTable/TableComponents';
import renderer from 'react-test-renderer';

const { describe, it, expect } = global;

describe('Cell', () => {
  it('captures snapshot of Cell', () => {
    const snappedComponent = renderer.create(<Cell />).toJSON();

    expect(snappedComponent).toMatchSnapshot();
  });
});
