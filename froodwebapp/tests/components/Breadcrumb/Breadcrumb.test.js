import React from 'react';
import { Breadcrumb } from 'components';
import { shallow } from 'enzyme';
import toJson from 'enzyme-to-json';

const { describe, it, expect } = global;

describe('Breadcrumb', () => {
  it('captures snapshot of Breadcrumb', () => {
    const props = {
      pathnames: ['', 'categories', 'inventory']
    };
    const snappedComponent = shallow(<Breadcrumb { ...props } />);

    expect(toJson(snappedComponent)).toMatchSnapshot();
  });

  it('captures snapshot of Breadcrumb without Link', () => {
    const props = {
      pathnames: ['categories', 'inventory']
    };
    const snappedComponent = shallow(<Breadcrumb { ...props } />);

    expect(toJson(snappedComponent)).toMatchSnapshot();
  });
});
