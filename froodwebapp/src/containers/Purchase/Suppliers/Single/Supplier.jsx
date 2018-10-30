import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';
import { PageHeader } from 'components';
import { Tabs, ConnectedMainTab } from './Tabs';

export class Supplier extends Component {
  constructor(props) {
    super(props);
    const supplierId = props.match.params.id;
    const isNewSupplier = supplierId === 'new';

    this.state = {
      supplierId,
      isNewSupplier
    };
  }

  componentWillReceiveProps(nextProps) {
    const supplierId = nextProps.match.params.id;
    const isNewSupplier = supplierId === 'new';

    this.setState({
      supplierId,
      isNewSupplier
    });
  }

  render() {
    const {
      supplierId,
      isNewSupplier
    } = this.state;

    return (
      <div>
        { isNewSupplier &&
          <PageHeader
            bigText="Product Supplier"
            smallText="Create new supplier for your products"
          />
        }
        { isNewSupplier &&
          <ConnectedMainTab
            supplierId={ supplierId }
            isNewSupplier={ isNewSupplier }
          />
        }
        { !isNewSupplier &&
          <Tabs
            supplierId={ supplierId }
            isNewSupplier={ isNewSupplier }
          />
        }
      </div>
    );
  }
}

Supplier.propTypes = {
  // router
  match: PropTypes.object.isRequired
};

export default withRouter(Supplier);
