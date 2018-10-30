import React from 'react';
import { Row, Col } from 'react-flexbox-grid';
import { MenuLinkItem } from 'components';
import {
  IconAdjustment,
  IconStockCount,
} from 'styles/frood_icons';

const Transactions = () => (
  <Row>
    <Col lg={ 3 }>
      <MenuLinkItem
        pathname="/inventory/adjustments"
        name="Adjustments"
        icon={ IconAdjustment }
      />
    </Col>
    <Col lg={ 3 }>
      <MenuLinkItem
        pathname="/inventory/stock-count"
        name="Stock Count"
        icon={ IconStockCount }
      />
    </Col>
  </Row>
);

export default Transactions;
