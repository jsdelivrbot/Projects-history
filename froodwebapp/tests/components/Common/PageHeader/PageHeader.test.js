import React from 'react';
import { PageHeader } from 'components';
import renderer from 'react-test-renderer';

const { describe, it, expect } = global;

describe('PageHeader', () => {
  it('checks for PageHeader`s children', () => {
    const props = {
      bigText: 'big text'
    };
    const snappedComponent = renderer.create(<PageHeader { ...props } />).toJSON();

    expect(snappedComponent).toMatchSnapshot();
  });
});
