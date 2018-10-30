import React, { Component } from 'react';
import PropTypes from 'prop-types';
import AddressInfo from './AddressInfo';
import { addressList } from './FormAddressList.scss';

class FormAddressList extends Component {
  handleAddressClick = (addressId) => {
    const newCompany = this.props.allAddresses.find(company => company.address.id === Number(addressId));
    this.props.input.onChange({
      id: newCompany.id,
      name: newCompany.name,
      address: newCompany.address
    });
  }

  handleEditIconClick = (e) => {
    const newCompany = this.props.allAddresses.find(company => company.address.id === Number(e.target.id));
    this.props.handleAddressRedirect(newCompany);
  }

  render() {
    const { allAddresses } = this.props;

    return (
      <div className={ addressList }>
        { allAddresses.map(user => (
          <div key={ user.address.id }>
            <AddressInfo
              user={ user }
              addressClick={ this.handleAddressClick }
              editIconVisible
              editIconClick={ this.handleEditIconClick }
            />
          </div>
        ))}
      </div>
    );
  }
}


FormAddressList.propTypes = {
  input: PropTypes.object.isRequired,
  allAddresses: PropTypes.array,
  handleAddressRedirect: PropTypes.func.isRequired
};

export default FormAddressList;
