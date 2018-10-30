import React from 'react';

import { Row, Col } from 'react-bootstrap';
import Icon from 'react-icons-kit';
import { gear } from 'react-icons-kit/fa/gear';

import styles from '../NavTimetabs/SideNavMenu-styles.scss';

const NavMarkingTypes = () => {
  return (
    <div className={`${styles.sidenav} `}>
      <div className="menu">
        <Row>
          <Col>
            <h5 className={styles.sidenav__header}>Marking types
              <span className={styles.nav__edit}
                >Edit  <Icon size={15} icon={gear} className={`${styles.sidenav__item__icon, styles.edit__icon}`}/>
              </span>
            </h5>
            <ul className={`${styles.sidenav__list} nav nav-list `}>
              <li className={styles.sidenav__item}>
                <svg width="20" height="20" viewBox="0 0 120 120" xmlns="http://www.w3.org/2000/svg">
                  <rect x="10" y="10" width="100" height="100" rx="15" ry="15" fill="#EA1F24"/>
                </svg> <span className={styles.item__divider} />
                Planned
              </li>
              <li className={styles.sidenav__item}>
                <svg width="20" height="20" viewBox="0 0 120 120" xmlns="http://www.w3.org/2000/svg">
                  <rect x="10" y="10" width="100" height="100" rx="15" ry="15" fill="#F8AD3A"/>
                </svg> <span className={styles.item__divider} />
                Started
              </li>
              <li className={styles.sidenav__item}>
                <svg width="20" height="20" viewBox="0 0 120 120" xmlns="http://www.w3.org/2000/svg">
                  <rect x="10" y="10" width="100" height="100" rx="15" ry="15" fill="#8AC341"/>
                </svg> <span className={styles.item__divider} />
                Finished
              </li>
              <li className={styles.sidenav__item}>
                <svg width="20" height="20" viewBox="0 0 120 120" xmlns="http://www.w3.org/2000/svg">
                  <g>
                    <rect x="10" y="10" width="100" height="100" rx="15" ry="15" fill="#E81E7A"/>
                    <text x="14" y="15" fontSize="12" fill="#FFFFFF">!</text>
                  </g>
                </svg><span className={styles.item__divider} />
                 No billing info
              </li>
            </ul>
          </Col>
        </Row>
      </div>
    </div>
  )
}

export default NavMarkingTypes;
