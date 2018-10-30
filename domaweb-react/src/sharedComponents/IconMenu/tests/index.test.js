import React from 'react';
import { shallow } from 'enzyme';
import { shallowToJson } from 'enzyme-to-json';

import IconMenu from '../index';

describe('<IconMenu />', () => {
  it('should render not selected internal menu', () => {
    const renderedComponent = shallow(
      <IconMenu />,
    );
    expect(shallowToJson(renderedComponent)).toMatchSnapshot();
  });

  it('should render not selected internal menu', () => {
    const renderedComponent = shallow(
      <IconMenu selected/>,
    );
    expect(shallowToJson(renderedComponent)).toMatchSnapshot();
  });
});