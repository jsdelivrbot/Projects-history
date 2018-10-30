import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Button } from 'components';
import { Icon } from 'antd';
import {
  addressInfo,
  addressUserName,
  editIcon
} from './AddressInfo.scss';

class AddressInfo extends Component {
  handleAddressClick = () => {
    if (this.props.addressClick) {
      this.props.addressClick(this.props.user.address.id);
    }
  }

  render() {
    const {
      user,
      editIconVisible = false,
      editIconClick
    } = this.props;

    return (
      <Button
        className={ addressInfo }
        onClick={ this.handleAddressClick }
      >
        <div className={ addressUserName }>
          <strong>{ user.name }</strong>
          { editIconVisible &&
            <Icon
              id={ user.address.id }
              className={ editIcon }
              type="edit"
              onClick={ editIconClick }
            />
          }
        </div>
        { user.address &&
          <span>
            { user.address.address1 && <div>{ user.address.address1 }</div> }
            { user.address.address2 && <div>{ user.address.address2 }</div> }
            { user.address.cityName && <div>{ `${user.address.cityName} ${user.address.postalCode || ''}` }</div> }
            { user.address.countryName && <div>{ user.address.countryName }</div> }
            { user.address.countryCode &&
              <div id="phoneNo">
                { `${user.address.countryCode || ''}${user.address.phone || ''}` }
              </div>
            }
          </span>
        }
        { !user.address &&
          <span>
            <div>There is no address</div>
            <div>Please, add new one</div>
          </span>
        }
      </Button>
    );
  }
}

AddressInfo.propTypes = {
  user: PropTypes.object,
  addressClick: PropTypes.func,
  editIconVisible: PropTypes.bool,
  editIconClick: PropTypes.func,
};

export default AddressInfo;
