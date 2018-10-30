import React from 'react';
import { Row, Col } from 'react-flexbox-grid';
import { MenuLinkItem } from 'components';
import {
  IconChannels,
  IconFulfilment,
} from 'styles/frood_icons';

const Sales = () => (
  <Row>
    <Col lg={ 3 }>
      <MenuLinkItem
        pathname="/settings/sales/channels"
        name="Channels"
        icon={ IconChannels }
      />
    </Col>
    <Col lg={ 3 }>
      <MenuLinkItem
        pathname="/settings/sales/fulfilment"
        name="Fulfilment"
        icon={ IconFulfilment }
      />
    </Col>
  </Row>
);

export default Sales;
