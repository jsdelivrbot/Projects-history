import React from 'react';

import { Row, Col } from 'react-bootstrap';

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

const NavMenu = () => {
  return (
    <div className={`${styles.sidenav} `}>
      <div className="menu">
        <Row>
          <Col>
            <h5 className={styles.sidenav__header}>Menu</h5>
            <ul className={`${styles.sidenav__list} nav nav-list `}>
              <li className={styles.sidenav__item}> <img src={print} className={styles.sidenav__item__icon} alt="print" /> Print </li>
              <li className={styles.sidenav__item}> <img src={bcr} className={styles.sidenav__item__icon} alt="print" /> Create resource </li>
              <li className={styles.sidenav__item}> <img src={bsp} className={styles.sidenav__item__icon} alt="print" /> Service plan </li>
              <li className={styles.sidenav__item}> <img src={optimization} className={styles.sidenav__item__icon} alt="print" /> Optimization </li>
              <li className={styles.sidenav__item}> <img src={search} className={styles.sidenav__item__icon} alt="print" /> Full search </li>
              <li className={styles.sidenav__item}> <img src={bta} className={styles.sidenav__item__icon} alt="print" /> Task administration </li>
              <li className={styles.sidenav__item}> <img src={bis} className={styles.sidenav__item__icon} alt="print" /> Import shifts </li>
              <li className={styles.sidenav__item}> <img src={bes} className={styles.sidenav__item__icon} alt="print" /> Export shifts </li>
              <li className={styles.sidenav__item}> <img src={bcs} className={styles.sidenav__item__icon} alt="print" /> Create shifts </li>

            </ul>
          </Col>
        </Row>
      </div>
    </div>
  )
}

export default NavMenu;
