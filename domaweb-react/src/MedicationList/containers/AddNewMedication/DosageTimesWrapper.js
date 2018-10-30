import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { FormattedMessage } from 'react-intl';
import { createStructuredSelector } from 'reselect';
import TextField from '../../../sharedComponents/TextFieldGeneric';
import { Col, Row } from 'react-bootstrap';

const DosageTimesWrapper = ({ children }) => {
  return (
    <div>
      <React.Fragment>
      {React.Children.map(children, (child, i) => {
        return (
          <Col lg={2} md={2} sm={2} xs={2}>
            {child}
          </Col>
        );
      })}
      </React.Fragment>
    </div>
  );
};

export default DosageTimesWrapper;
