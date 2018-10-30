import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import ConnectedPickTabSection from './PickTabSection';

const mapStateToProps = state => ({
  orderId: state.order.initialValues.id,
  data: state.order.pickData,
});

export const PickTab = ({ data, orderId }) => (
  <div>
    { data.map((pickData, pickDataIndex) => (
      <ConnectedPickTabSection
        key={ pickDataIndex }
        data={ pickData }
        orderId={ orderId }
      />
    ))}
  </div>
);

PickTab.propTypes = {
  data: PropTypes.array,
  orderId: PropTypes.string.isRequired
};

export default connect(mapStateToProps)(PickTab);
