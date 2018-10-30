import React from 'react';
import { Footer } from 'components';
import renderer from 'react-test-renderer';

const { describe, it, expect } = global;

describe('Footer', () => {
  it('renders without params', () => {
    const snappedComponent = renderer.create(<Footer />).toJSON();

    expect(snappedComponent).toMatchSnapshot();
  });
});
