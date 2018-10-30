import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import ConnectedShipTabSection from './ShipTabSection';

const mapStateToProps = state => ({
  orderId: state.order.initialValues.id,
  data: state.order.shipData,
});

export const ShipTab = ({ data, orderId }) => (
  <div>
    { data.map((shipData, shipDataIndex) => (
      <ConnectedShipTabSection
        key={ shipDataIndex }
        data={ shipData }
        orderId={ orderId }
      />
    ))}
  </div>
);

ShipTab.propTypes = {
  data: PropTypes.array,
  orderId: PropTypes.string.isRequired
};

export default connect(mapStateToProps)(ShipTab);
