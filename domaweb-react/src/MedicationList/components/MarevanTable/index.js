/**
*
* MarevanTable
*
*/

import React from 'react';
// import styled from 'styled-components';

import { FormattedMessage } from 'react-intl';
import { Table } from 'react-bootstrap';
import messages from './messages';

function MarevanTable({ dosage }) {
  if (!dosage) {
    return (
      <div>
        <FormattedMessage {...messages.emptyMessage} />
      </div>
    );
  }
  return (
    <div>
      {dosage && <Table>
        <thead>
          <tr>
            <th><FormattedMessage {...messages.date} /></th>
            <th><FormattedMessage {...messages.actuary} /></th>
            <th><FormattedMessage {...messages.notes} /></th>
            <th><FormattedMessage {...messages.result} /></th>
            <th>M</th>
            <th>T</th>
            <th>W</th>
            <th>T</th>
            <th>F</th>
            <th>S</th>
            <th>S</th>
          </tr>
        </thead>
        <tbody>
          {dosage.map((item, index) =>
            <tr key={index}>
              <td>{item.date}</td>
              <td>{item.actuary}</td>
              <td>{item.notes}</td>
              <td>{item.result}</td>
              <td>{item.mon}</td>
              <td>{item.tue}</td>
              <td>{item.wed}</td>
              <td>{item.thu}</td>
              <td>{item.fri}</td>
              <td>{item.sat}</td>
              <td>{item.sun}</td>
            </tr>
          )}
        </tbody>
      </Table>}
    </div>
  );
}

MarevanTable.propTypes = {

};

export default MarevanTable;
