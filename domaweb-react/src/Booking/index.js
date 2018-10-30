/*
 * Booking is the main container for the Side Navigation and the placeholder for
 the calendar
 */

import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { createStructuredSelector } from 'reselect';
import { DragDropContext } from 'react-dnd';
import HTML5Backend from 'react-dnd-html5-backend';
import Icon from 'react-icons-kit';
import { caretLeft } from 'react-icons-kit/fa/caretLeft';
import { caretRight } from 'react-icons-kit/fa/caretRight';

import AuthRequired from '../sharedComponents/AuthRequired';
import Spinner from '../sharedComponents/Spinner';
import styles from './Booking-styles.scss';
import {
  Timetabs,
  selectedTimetabId,
  selectedBookingTypes,
  isLoading,
  timetabDetails }
  from './selectors';
import {
  loadBookingTypes,
  loadTimetabs,
  loadSelectedTimeTab,
 } from './actions';
import NavTimeTabs from './components/NavTimetabs';
import NavMenu from './components/NavMenu';
import NavBookingTypes from './components/NavBookingTypes';
import NavMarkingTypes from './components/NavMarkingTypes';

export class Booking extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      sidebarVisible: true,
      showSideMenu: true,
    };
  }

  // LoadTimetabs once component is mounted
  componentDidMount() {
    this.props.loadTimetabs();
  }

  // On timetab link click dipsatch loadSelectedTimeTab action with an ID
  onLinkClicked = (id) => {
    this.props.loadSelectedTimeTab(id);
  }

  // show or hide sidebar
  toggleSidebar = (toggleStatus) => {
    this.setState({ sidebarVisible: toggleStatus });
  }

  render() {
    const { timetabs, bookingTypes } = this.props;

    const childrenWithProps = React.Children.map(this.props.children, (child) => {
      return React.cloneElement(child, {
        toggleSidebar: this.toggleSidebar,
        bookingTypes: this.props.bookingTypes,
        showSideMenu: this.state.showSideMenu,
      });
    });

    if (this.props.timetabs) {
      return (
        <div className="booking">
          <div className={`booking ${styles.booking__wrapper}`}>
            { this.state.showSideMenu &&
              <div className="booking__sidenav">
                <div className={styles.sidenav_child_wrapper}>
                  <NavMenu />
                  <NavTimeTabs
                    navitems={timetabs}
                    onLinkClick={this.onLinkClicked.bind(this)}
                    selectedIndex={this.props.params.timetabId}
                  />
                  <NavBookingTypes bookingtypes={bookingTypes} />
                  <NavMarkingTypes />
                </div>
              </div>
            }
            <div className={styles.booking__collapser} onClick={() => this.setState({ showSideMenu: !this.state.showSideMenu })}>
              { this.state.showSideMenu ?
                <Icon
                  size={15}
                  icon={caretLeft}
                  className={styles.collapsed_icon}
                /> :
                <Icon
                  size={15}
                  icon={caretRight}
                  className={styles.collapsed_icon}
                />
              }
            </div>
            <div style={{ width: '100%' }}>
              {childrenWithProps}
            </div>
          </div>
        </div>
      );
    }
    // show the loading state
    return (
      <Spinner />
    );
  }
}
Booking.propTypes = {
  loadTimetabs: PropTypes.func.isRequired,
  loadSelectedTimeTab: PropTypes.func.isRequired,
  timetabs: PropTypes.oneOfType([
    PropTypes.object,
    PropTypes.arrayOf(
      PropTypes.shape({
        id: PropTypes.number.isRequired,
        name: PropTypes.string.isRequired,
        color: PropTypes.string.isRequired,
      }).isRequired,
    ),
  ]),
  bookingTypes: PropTypes.oneOfType([
    PropTypes.object,
    PropTypes.arrayOf(
      PropTypes.shape({
        id: PropTypes.number.isRequired,
        name: PropTypes.string.isRequired,
        color: PropTypes.string.isRequired,
      }).isRequired,
    ),
  ]),
  children: PropTypes.node,
  params: PropTypes.object,
};

const mapStateToProps = createStructuredSelector({
  timetabs: Timetabs(),
  activeTimetabID: selectedTimetabId(),
  bookingTypes: selectedBookingTypes(),
  isLoading: isLoading(),
  timetabDetails: timetabDetails(),
});

const mapDispatchToProps = dispatch => ({
  loadTimetabs: bindActionCreators(loadTimetabs, dispatch),
  loadSelectedTimeTab: bindActionCreators(loadSelectedTimeTab, dispatch),
  loadBookingTypes: bindActionCreators(loadBookingTypes, dispatch),
});

export default DragDropContext(HTML5Backend)(
  connect(mapStateToProps, mapDispatchToProps)(AuthRequired(Booking)),
);
