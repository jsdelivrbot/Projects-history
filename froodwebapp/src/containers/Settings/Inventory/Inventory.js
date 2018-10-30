import React from 'react';
import { Row, Col } from 'react-flexbox-grid';
import { MenuLinkItem } from 'components';
import {
  IconCategories,
  IconUOMs,
} from 'styles/frood_icons';

const Inventory = () => (
  <Row>
    <Col lg={ 3 }>
      <MenuLinkItem
        pathname="/settings/Inventory/product-categories"
        name="Product Categories"
        icon={ IconCategories }
      />
    </Col>
    <Col lg={ 3 }>
      <MenuLinkItem
        pathname="/settings/inventory/uom"
        name="Units of Measurements"
        icon={ IconUOMs }
      />
    </Col>
  </Row>
);

export default Inventory;
