/**
 *
 * App.react.js
 *
 * This component is the skeleton around the actual pages, and should only
 * contain code that should be seen on all pages. (e.g. navigation bar)
 *
 * NOTE: while this component should technically be a stateless functional
 * component (SFC), hot reloading does not currently support SFCs. If hot
 * reloading is not a necessity for you then you can refactor it and remove
 * the linting exception.
 */

import React from 'react';

import PropTypes from 'prop-types'
import {Grid, Row, Col} from 'react-bootstrap';

import Sidenav from '../sharedComponents/Sidenav';
// import BurgerMenuBar from '../sharedComponents/BurgerMenuBar';
import TopHeader from '../sharedComponents/TopHeader';
import Snackbar from '../sharedComponents/Snackbar';

import styles from '../assets/styles/layout.scss';
import utilities from '../assets/styles/utilities.scss';


class App extends React.PureComponent { // eslint-disable-line react/prefer-stateless-function

  static propTypes = {
    children: PropTypes.node,
  };

  render() {
    console.log('app running');
    const currentLocation = this.props.location.pathname;
    console.log('currentLocation ' + currentLocation);
    return (
      <Grid fluid>
        <Row className={utilities.hide_scrolbar_ie}>
          { currentLocation === '/login' ? '' : (<div className={styles.left_col}> <Sidenav /> </div>) }
          <div className={currentLocation === '/login' ? '' : styles.right_col}>
            <div className={currentLocation === '/login' || currentLocation === '/home' ? utilities.display_none :'' }>
              {currentLocation.split('/')[1] === 'booking' ? null : <TopHeader component={currentLocation} /> }
           </div>
            <div className={utilities.padding_right_zero}>
              {React.Children.toArray(this.props.children)}
            </div>
          </div>
          <div>
            {currentLocation !=='/login' && <Snackbar />}
          </div>
        </Row>
      </Grid>
    );
  }

}

export default App;
