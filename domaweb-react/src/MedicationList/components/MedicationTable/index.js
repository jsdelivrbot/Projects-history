/**
*
* ContinuousMedication
*
*/

import React from 'react';
// import styled from 'styled-components';

import { FormattedMessage, FormattedDate } from 'react-intl';
import { Table } from 'react-bootstrap';
import messages from './messages';

function MedicationTable({ medication, showDate }) {
  //const { name, notice, dosage, d1, d2, d3, d4, d5 } = medication;
  console.log(medication);
  if (!medication || medication.length < 1) {
    return(
      <div>No items available</div>
    );
  }
  return (
    <div>
      <Table>
        <thead>
          <tr>
            {showDate && <th><FormattedMessage {...messages.date} /></th>}
            <th><FormattedMessage {...messages.name} /></th>
            <th><FormattedMessage {...messages.notes} /></th>
            <th><FormattedMessage {...messages.dosage} /></th>
            <th>A</th>
            <th>P</th>
            <th>IP</th>
            <th>I</th>
            <th>Y</th>
          </tr>
        </thead>
        <tbody>
          {medication && medication.map((item, index) =>
            <tr key={index}>
              {showDate && <td>{item.timeOfAddition}</td>}
              <td>{item.name}</td>
              <td>{item.notice}</td>
              <td>{item.dosage}</td>
              <td>{item.d1}</td>
              <td>{item.d2}</td>
              <td>{item.d3}</td>
              <td>{item.d4}</td>
              <td>{item.d5}</td>
            </tr>
          )}
        </tbody>
      </Table>
    </div>
  );
}

/*ContinuousMedication.propTypes = {

};*/

export default MedicationTable;
