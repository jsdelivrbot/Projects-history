import React from 'react';
import PropTypes from 'prop-types';
import AddressInfo from './AddressInfo';

const FormAddressInfo = ({ input: { value } }) => (
  <AddressInfo user={ value } />
);

FormAddressInfo.propTypes = {
  input: PropTypes.object.isRequired
};

export default FormAddressInfo;
