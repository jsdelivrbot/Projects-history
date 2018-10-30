import React from 'react';
import { Row } from 'components/Common/DynamicTable/TableComponents';
import renderer from 'react-test-renderer';

const { describe, it, expect } = global;

describe('Row', () => {
  it('captures snapshot of Row', () => {
    const snappedComponent = renderer.create(<Row />).toJSON();

    expect(snappedComponent).toMatchSnapshot();
  });
});
