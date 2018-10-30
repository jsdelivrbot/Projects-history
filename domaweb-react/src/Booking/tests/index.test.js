/**
* Test the Booking container
**/

import React from 'react';
import { shallow, mount } from 'enzyme';

import Booking from '../index';
import NavTimeTabs from '../components/NavTimetabs';
import NavMenu from '../components/NavMenu';
import NavBookingTypes from '../components/NavBookingTypes';
import NavMarkingTypes from '../components/NavMarkingTypes';

describe('<Booking/> ', () => {
  it('should render the Nav menu', () => {
    const renderedComponent = shallow(
      <Booking />
    );
    expect(renderedComponent.find(NavMenu).length).toBe(1);
  })
})
