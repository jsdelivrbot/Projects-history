import React from 'react';
import PropTypes from 'prop-types';
import { Col, Row } from 'react-bootstrap';

const FullWidthCol = ({ children }) => {
  return (
    <div>
      <React.Fragment>
      {React.Children.map(children, (child, i) => {
        return (
          <Col lg={12} md={12} sm={12} xs={12}>
            {child}
          </Col>
        );
      })}
      </React.Fragment>
    </div>
  );
};

export default FullWidthCol;