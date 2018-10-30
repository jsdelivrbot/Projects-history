import React from 'react';
import { GridTags } from 'components';
import renderer from 'react-test-renderer';

const { describe, it, expect } = global;

describe('GridTags', () => {
  it('captures snapshot of GridTags', () => {
    const snappedComponent = renderer.create(<GridTags />).toJSON();

    expect(snappedComponent).toMatchSnapshot();
  });
});
