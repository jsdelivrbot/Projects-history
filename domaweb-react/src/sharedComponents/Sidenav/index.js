/**
*
* Sidenav Component
*
*/

import React from 'react';
import Swipeable from 'react-swipeable';
import { Grid, Row, Col } from 'react-bootstrap';
import { Link } from 'react-router';
import { IntlProvider } from 'react-intl';
import Icon from 'react-icons-kit';
import { ic_menu } from 'react-icons-kit/md/ic_menu';

import Sidenavitem from './components/Sidenavitem'; // Import the side nav item
import ToggleOpen from '../ToggleOpen';

import styles from './sidenav-styles.scss'; // Import the nav styles
import utilities from '../../assets/styles/utilities.scss';

import items from './sidenav-items'; // Import the list of sidenav Items from JSON


class Sidenav extends React.Component {

  render() {
    console.log('Running sidenav');
    console.log('*********');
    return (
      <ToggleOpen resizeRule={'(max-width: 960px)'}>
        {(isOpen, toggleHandler) => (
          <Row className={styles.sidenav}>
            <Swipeable className={`${styles.sideNav_swiper} ${isOpen ? styles.sideNav_swiper_closed : styles.sideNav_swiper_wide}`} onSwiped={toggleHandler} onClick={toggleHandler} />
            <div className={(window.matchMedia('(max-width: 960px)').matches ? isOpen ? '' : styles.overlay : '')} />
            <Col xs={12}>
              <div onClick={toggleHandler} className={`${styles.sidenav_burger_menu} ${(window.matchMedia('(max-width: 960px)').matches ? isOpen ? utilities.display_block : utilities.display_none : '')}`}>
                <Icon icon={ic_menu} size={28} className={styles.sidenav__burger__menu__img } />
              </div>
              <div className={styles.sidenav__nav + ' ' + (window.matchMedia('(max-width: 960px)').matches ? isOpen ? `${utilities.display_none} ${styles.slideOut}` : `${utilities.display_block} ${styles.slideIn}` : '')}>
                <div onClick={toggleHandler} className={styles.sidenav__close__bttn}>
                  <span className={styles.sidenav__close__bttn_txt}> X </span>
                </div>
                 <div className={styles.logo} >
                   <Link to="home" onClick={window.matchMedia('(max-width: 960px)').matches ? toggleHandler : ()=> 0} >
                      <img
                        src={require('../../assets/images/brand/domacare_pelkka-logo.svg')}
                        className={styles.logo__image}
                      />
                  </Link>
                </div>
               <ul className={styles.sidenav__nav__menu}>
                  {
                    Object.keys(items).map(key => <Sidenavitem detail={items[key]} key={key} handlerResponsive={toggleHandler} />)
                  }
                </ul>
              </div>
            </Col>
        </Row>
        )}

      </ToggleOpen>
    );
  }
}

export default Sidenav;
