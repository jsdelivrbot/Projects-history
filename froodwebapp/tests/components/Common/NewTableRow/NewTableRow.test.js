import React from 'react';
import { NewTableRow } from 'components';
import renderer from 'react-test-renderer';

const { describe, it, expect } = global;

describe('NewTableRow', () => {
  it('captures snapshot of NewTableRow', () => {
    const props = {
      onClick: jest.fn(),
      addNewRowText: 'text'
    };
    const snappedComponent = renderer.create(<NewTableRow { ...props } />).toJSON();

    expect(snappedComponent).toMatchSnapshot();
  });
});
