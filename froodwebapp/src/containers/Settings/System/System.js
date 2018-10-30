import React from 'react';
import { Row, Col } from 'react-flexbox-grid';
import { MenuLinkItem } from 'components';
import {
  IconUsers,
  IconLocations,
  IconTaxes,
  IconPaymentTerms,
  IconPriceLists
} from 'styles/frood_icons';

const System = () => (
  <Row>
    <Col lg={ 3 }>
      <MenuLinkItem
        pathname="/settings/system/users"
        name="Users"
        icon={ IconUsers }
      />
    </Col>
    <Col lg={ 3 }>
      <MenuLinkItem
        pathname="/settings/system/locations"
        name="Locations"
        icon={ IconLocations }
      />
    </Col>
    <Col lg={ 3 }>
      <MenuLinkItem
        pathname="/settings/system/taxes"
        name="Taxes"
        icon={ IconTaxes }
      />
    </Col>
    <Col lg={ 3 }>
      <MenuLinkItem
        pathname="/settings/system/payment-terms"
        name="Payment Terms"
        icon={ IconPaymentTerms }
      />
    </Col>
    <Col lg={ 3 }>
      <MenuLinkItem
        pathname="/settings/system/price-lists"
        name="Price Lists"
        icon={ IconPriceLists }
      />
    </Col>
  </Row>
);

export default System;
