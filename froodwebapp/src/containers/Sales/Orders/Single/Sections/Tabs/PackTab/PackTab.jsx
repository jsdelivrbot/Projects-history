import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import ConnectedPackTabSection from './PackTabSection';

const mapStateToProps = state => ({
  orderId: state.order.initialValues.id,
  data: state.order.packData,
});

export const PackTab = ({ data, orderId }) => (
  <div>
    { data.map((packData, packDataIndex) => (
      <ConnectedPackTabSection
        key={ packDataIndex }
        data={ packData }
        orderId={ orderId }
      />
    ))}
  </div>
);

PackTab.propTypes = {
  data: PropTypes.array,
  orderId: PropTypes.string.isRequired
};

export default connect(mapStateToProps)(PackTab);
