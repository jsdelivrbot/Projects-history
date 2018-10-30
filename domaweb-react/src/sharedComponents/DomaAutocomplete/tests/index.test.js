import React from 'react';
import { shallow } from 'enzyme';

import DomaAutocomplete from '../index';

describe('<DomaAutocomplete />', () => {
  it('should render a div', () => {
    const component = shallow(<DomaAutocomplete />);
    expect(component.type()).toEqual('div');
  });

});
