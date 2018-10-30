import React from 'react';
import { Table } from 'components/Common/DynamicTable/TableComponents';
import renderer from 'react-test-renderer';

const { describe, it, expect } = global;

describe('Table', () => {
  it('captures snapshot of Table', () => {
    const snappedComponent = renderer.create(<Table />).toJSON();

    expect(snappedComponent).toMatchSnapshot();
  });
});
