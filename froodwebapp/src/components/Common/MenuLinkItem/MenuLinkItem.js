import React from 'react';
import PropTypes from 'prop-types';
import { Card } from 'antd';
import { Link } from 'react-router-dom';
import { menuLinkCard } from './MenuLinkItem.scss';

const MenuLinkItem = ({
  pathname,
  name,
  icon
}) => (
  <Link to={ pathname }>
    <Card className={ menuLinkCard }>
      <p>{ name }</p>
      <img
        src={ icon }
        alt={ name }
      />
    </Card>
  </Link>
);

MenuLinkItem.propTypes = {
  pathname: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  icon: PropTypes.node.isRequired
};

export default MenuLinkItem;
