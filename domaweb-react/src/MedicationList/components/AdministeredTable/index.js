/**
*
* AdministeredTable
*
*/

import React from 'react';
// import styled from 'styled-components';
import { Table } from 'react-bootstrap';
import { FormattedMessage } from 'react-intl';
import messages from './messages';
import { MdCheck } from 'react-icons/lib/md/';

const Checked = ({ value }) => value ? <MdCheck color={'green'} size={'25px'} /> : null;


function AdministeredTable({ medication }) {
  if (!medication) {
    return (
      <div>no items available</div>
    );
  }
  return (
    <div>
      <Table>
        <thead>
          <tr>
            <th><FormattedMessage {...messages.date} /></th>
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
              <td>{item.timeOfAddition}</td>
              <td>{item.name}</td>
              <td>{item.notice}</td>
              <td>{item.dosage}</td>
              <td><Checked value={item.d1} /></td>
              <td><Checked value={item.d2} /></td>
              <td><Checked value={item.d3} /></td>
              <td><Checked value={item.d4} /></td>
              <td><Checked value={item.d5} /></td>
            </tr>
          )}
        </tbody>
      </Table>
    </div>
  );
}

AdministeredTable.propTypes = {

};

export default AdministeredTable;
