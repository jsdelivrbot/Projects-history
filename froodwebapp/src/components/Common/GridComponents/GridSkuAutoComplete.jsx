import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { ConnectedSkuAutoComplete } from 'components';
import { connect } from 'react-redux';
import {
  skuWarehouseInfoRequest,
  skuVendorWarehouseInfoRequest
} from 'redux-base/actions';

const mapStateToProps = state => ({
  gridRowId: state.autocomplete.gridRowId,
  skuWarehouseInfo: state.autocomplete.skuWarehouseInfo
});

const mapDispatchToProps = {
  skuWarehouseInfoRequest,
  skuVendorWarehouseInfoRequest
};

export class GridSkuAutoComplete extends PureComponent {
  componentWillReceiveProps(nextProps) {
    if (nextProps.skuWarehouseInfo.id
     && nextProps.gridRowId === nextProps.index) {
      this.props.handleFillSkuData(nextProps.skuWarehouseInfo, this.props.index);
    }
  }

  onChange = (id) => {
    this.props.onChange(id, this.props.index, this.props.propName);
  }

  onSelect = (id) => {
    const {
      vendorId,
      index,
      propName
    } = this.props;
    if (vendorId) {
      this.props.skuVendorWarehouseInfoRequest({
        id,
        vendorId,
        gridRowId: index,
      });
    } else {
      this.props.skuWarehouseInfoRequest({
        id,
        gridRowId: index
      });
    }
    this.props.onChange(id, index, propName);
  }

  render() {
    const {
      value,
      vendorId,
      disabled = false,
    } = this.props;

    return (
      <ConnectedSkuAutoComplete
        value={ value }
        vendorId={ vendorId }
        disabled={ disabled }
        onChange={ this.onChange }
        onSelect={ this.onSelect }
        inputStyle={ {
          borderRadius: '0',
          borderTop: 'none',
          borderBottom: 'none',
          height: '100%',
          textAlign: 'center',
          fontWeight: 300,
          color: 'f0f2f5'
        } }
      />
    );
  }
}

GridSkuAutoComplete.propTypes = {
  value: PropTypes.string,
  vendorId: PropTypes.number,
  index: PropTypes.number,
  onChange: PropTypes.func.isRequired,
  propName: PropTypes.string.isRequired,
  disabled: PropTypes.bool,
  handleFillSkuData: PropTypes.func.isRequired,
  // redux-base
  gridRowId: PropTypes.number,
  skuWarehouseInfo: PropTypes.object.isRequired,
  skuWarehouseInfoRequest: PropTypes.func.isRequired,
  skuVendorWarehouseInfoRequest: PropTypes.func.isRequired
};

export default connect(mapStateToProps, mapDispatchToProps)(GridSkuAutoComplete);
