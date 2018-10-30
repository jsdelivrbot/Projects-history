import React from 'react';

import { Row, Col } from 'react-bootstrap';
import Icon from 'react-icons-kit';
import { gear } from 'react-icons-kit/fa/gear';

import bta from '../../../assets/images/booking/booking_task_administration.svg';
import optimization from '../../../assets/images/booking/booking_optimization.svg';
import print from '../../../assets/images/booking/booking_print.svg';
import bsp from '../../../assets/images/booking/booking_service_plan.svg';
import bcs from '../../../assets/images/booking/booking_create_shifts.svg';
import search from '../../../assets/images/booking/booking_advanced_search.svg';
import bes from '../../../assets/images/booking/booking_export_shifts.svg';
import bis from '../../../assets/images/booking/booking_import_shifts.svg';
import bcr from '../../../assets/images/booking/booking_create_resource.svg';

import styles from '../NavTimetabs/SideNavMenu-styles.scss';
import Spinner from '../../../sharedComponents/Spinner';

const NavBookingTypes = ({bookingtypes}) => {
  return (
    <div className={`${styles.sidenav} `}>
      <div className="menu">
        <Row>
          <Col>
            <h5 className={styles.sidenav__header}>Booking types
              <span className={styles.nav__edit}
                >Edit  <Icon size={15} icon={gear} className={`${styles.sidenav__item__icon, styles.edit__icon}`}/>
              </span>
            </h5>
            <ul className={`${styles.sidenav__list} nav nav-list `}>
              {bookingtypes ? bookingtypes.map(booking =>(
                <li className={styles.sidenav__item} key={booking.id}>
                  <svg width="20" height="20" viewBox="0 0 120 120" xmlns="http://www.w3.org/2000/svg">
                    <rect x="10" y="10" width="100" height="100" rx="15" ry="15" fill={booking.color} />
                  </svg> <span className={styles.item__divider} />
                {booking.name}
                </li>
              ))
                : <Spinner />
              }
            </ul>
          </Col>
        </Row>
      </div>
    </div>
  )
}

export default NavBookingTypes;
