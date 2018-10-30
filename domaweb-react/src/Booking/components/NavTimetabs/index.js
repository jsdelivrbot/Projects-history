import React from 'react';

import Icon from 'react-icons-kit';
import { calendar } from 'react-icons-kit/icomoon/calendar';
import { printer } from 'react-icons-kit/icomoon/printer';
import { fileText } from 'react-icons-kit/icomoon/fileText';
import { ic_assignment_turned_in } from 'react-icons-kit/md/ic_assignment_turned_in';
import  {Grid, Row, Col, Button} from 'react-bootstrap';
import { ic_report } from 'react-icons-kit/md/ic_report';
import { gear } from 'react-icons-kit/fa/gear';
import Loadable from 'react-loadable';

import { Nav, Navbar, NavItem, MenuItem, ProgressBar} from 'react-bootstrap';
import { Link } from 'react-router';
import Spinner from '../../../sharedComponents/Spinner';

import styles from  './SideNavMenu-styles.scss';

const NavTimeTabs = ({ navitems, onLinkClick, selectedIndex} ) => {

  // get the navlist props
  const navlist = navitems;
  return (
    <div className={`${styles.sidenav} `}>
      <div className="menu">
        <Row>
          <Col>
            <h5 className={styles.sidenav__header}>Booking calendars
              <span className={styles.nav__edit}
                >Edit  <Icon size={15} icon={gear} className={`${styles.sidenav__item__icon, styles.edit__icon}`}/>
              </span>
            </h5>
            <ul className={`${styles.sidenav__list} nav nav-list `}>
              {navlist ? navlist.map(unit => (
                <Link to={`/booking/timetab/${unit.id}`}
                      key={unit.id}
                      onClick={() => onLinkClick(unit.id)}
                      activeClassName="selected"
                      >
                  <li className={styles.sidenav__item}
                    key={unit.id}
                    style={{backgroundColor: selectedIndex=== `${unit.id}`  ? '#51A4E6': null,
                    color: selectedIndex=== `${unit.id}`  ? '#FFFFFF': null}}
                    >
                    <span className={styles.item__divider} />
                    <span style={{ padding: 5 }}>{unit.name}</span>
                  </li>
                </Link>
              ))
                : <Spinner />
              }
            </ul>
          </Col>
        </Row>
      </div>
    </div>
  );
};

export default NavTimeTabs;
