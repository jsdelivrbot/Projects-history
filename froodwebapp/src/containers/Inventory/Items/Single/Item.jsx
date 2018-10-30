import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';
import { PageHeader } from 'components';
import { Tabs, ConnectedMainTab } from './Tabs';

export class Item extends Component {
  constructor(props) {
    super(props);
    const itemId = props.match.params.id;
    const isNewSkuItem = itemId === 'new';

    this.state = {
      itemId,
      isNewSkuItem
    };
  }

  componentWillReceiveProps(nextProps) {
    const itemId = nextProps.match.params.id;
    const isNewSkuItem = itemId === 'new';

    this.setState({
      itemId,
      isNewSkuItem
    });
  }

  render() {
    const {
      itemId,
      isNewSkuItem
    } = this.state;

    return (
      <div>
        { isNewSkuItem &&
          <PageHeader
            bigText="Product Details"
            smallText="Enter your product name, type and other details to setup your product"
          />
        }
        { isNewSkuItem &&
          <ConnectedMainTab
            isNewSkuItem={ isNewSkuItem }
          />
        }
        { !isNewSkuItem &&
          <Tabs
            itemId={ itemId }
            isNewSkuItem={ isNewSkuItem }
          />
        }
      </div>
    );
  }
}

Item.propTypes = {
  match: PropTypes.object.isRequired,
};

export default withRouter(Item);
