import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Popover, Icon, Button } from 'antd';
import FormAddressList from './FormAddressList';
import {
  addressHeader,
  newAddressButton,
  editIcon
} from './FormAddressPopup.scss';

class FormAddressPopup extends Component {
  constructor(props) {
    super(props);
    this.state = {
      visible: false
    };
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.input.value !== this.props.input.value) {
      this.setState({
        visible: false
      });
    }
  }

  handleTogglePoppup = () => {
    this.setState({
      visible: !this.state.visible
    });
  }

  handleAddNewAddress = () => {
    this.props.handleAddressRedirect();
  }

  render() {
    const {
      allAddresses,
      input,
      title,
      disabled = false
    } = this.props;

    return (
      <div>
        <div className={ addressHeader }>
          { title }
          { !disabled &&
            <Icon
              type="edit"
              className={ editIcon }
              onClick={ this.handleTogglePoppup }
            />
          }
        </div>
        <Popover
          placement="bottom"
          trigger="click"
          onVisibleChange={ this.handleTogglePoppup }
          visible={ this.state.visible }
          title={
            <Button
              className={ newAddressButton }
              onClick={ this.handleAddNewAddress }
            >
              + Add New Address
            </Button>
          }
          content={
            <FormAddressList
              allAddresses={ allAddresses }
              input={ input }
              handleAddressRedirect={ this.props.handleAddressRedirect }
            />
          }
        />
      </div>
    );
  }
}

FormAddressPopup.propTypes = {
  title: PropTypes.string.isRequired,
  disabled: PropTypes.bool,
  allAddresses: PropTypes.array,
  input: PropTypes.object.isRequired,
  handleAddressRedirect: PropTypes.func.isRequired,
};

export default FormAddressPopup;
