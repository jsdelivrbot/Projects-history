import React from 'react';
import PropTypes from 'prop-types';
import { Col, Row, Clearfix } from 'react-bootstrap';

const HalfWidth = ({ children, ...props }) => {
  return (
    <div>
      <React.Fragment>
        {React.Children.map(children, child => 
          <Col lg={3} md={3} sm={4} xs={5}>
            {React.cloneElement(child, {
              ...props,
            })}
          </Col>,
        )}
      </React.Fragment>
    </div>
  );
};

export default HalfWidth;