/*
BookingSideNav container which wraps NavBookingTypes, NavMarkingTypes, NavMenu
 */

import React from 'react';
import PropTypes from 'prop-types';

import NavTimeTabs from '../../components/NavTimetabs';
import NavMenu from '../../components/NavMenu';
import NavBookingTypes from '../../components/NavBookingTypes';
import NavMarkingTypes from '../../components/NavMarkingTypes';

class BookingSideNav extends React.PureComponent {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div>
        <NavMenu />
        <NavTimeTabs
          navitems={timetabs}
          onLinkClick={this.onLinkClicked.bind(this)}
          selectedIndex={this.props.params.timetabId}

        />
        <NavBookingTypes bookingtypes={bookingTypes} />
        <NavMarkingTypes />
      </div>
    );
  }
}

BookingSideNav.propTypes = {

};
export default BookingSideNav;
