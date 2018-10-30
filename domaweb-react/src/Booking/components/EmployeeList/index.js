/*
EmployeesList
 */

import React from 'react';
import PropTypes from 'prop-types';
import { Table, Col, Checkbox }
  from 'react-bootstrap';

import styles from './Employees-styles.scss';

var shortid = require('shortid');

class EmployeesList extends React.PureComponent {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div>
        <Col md={12}>
          <div className={styles.emp__map}>
            <h5 className={styles.employee__header}>Employees</h5>
            <div className={styles.employee__wrapper}>
              <table className={styles.emp_table}>
                <tbody>
                  <tr className={styles.emp__row}>
                    <td className={styles.emp__col}>
                      <Checkbox readOnly className={styles.emp__checkbox} />
                    </td>
                    <td className={styles.emp__col}>
                      <span className={styles.emp__name}>ALL</span>
                    </td>
                  </tr>
                  {this.props.employeesGroup.map(employee => (
                    <tr className={styles.emp__row} key={shortid.generate()}>
                      <td className={styles.emp__col} key={shortid.generate()}>
                        <Checkbox
                          className={styles.emp__checkbox}
                          id={employee.id}
                          data-id={employee.id}
                          value={employee.id}
                          onChange={this.props.onUpdate}
                        />
                      </td>
                      <td key={employee.id} className={styles.emp__col} key={shortid.generate()}>
                        <span className={styles.emp__name}
                          style={{color: `${employee.color}`}}
                           key={shortid.generate()}>{employee.title}</span>
                      </td>

                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </Col>
      </div>
    );
  }
}

EmployeesList.propTypes = {

};
export default EmployeesList;
